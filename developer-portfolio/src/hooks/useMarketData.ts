import { useEffect, useState, useRef } from "react";
import { SYMBOL_MAP, type MarketQuote } from "../components/quant/quantData";

// Multipliers to scale ETF prices to their corresponding futures contract levels
const MULTIPLIERS: Record<string, number> = {
  SPY: 10,             // SPY * 10 ≈ S&P 500 (MES)
  QQQ: 40,             // QQQ * 40 ≈ Nasdaq-100 (MNQ)
  GLD: 10,             // GLD * 10 ≈ Gold (MGC)
  USO: 1,              // USO ≈ Crude Oil (MCL)
  TLT: 1.1,            // TLT * 1.1 ≈ T-Note (ZN)
  "BINANCE:BTCUSDT": 1 // BTCUSDT (MBT)
};

export interface UseMarketDataResult {
  quotes: Map<string, MarketQuote>;
  chartPrices: number[];
  isLive: boolean;
}

export function useMarketData(): UseMarketDataResult {
  const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;
  const [quotes, setQuotes] = useState<Map<string, MarketQuote>>(new Map());
  const [chartPrices, setChartPrices] = useState<number[]>([]);
  const [isLive, setIsLive] = useState<boolean>(false);

  // Refs for tracking mutable values to avoid stale closures in event listeners
  const quotesRef = useRef<Map<string, MarketQuote>>(new Map());
  const chartPricesRef = useRef<number[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  // 1. Initial REST API fetch to seed quotes and create initial chart history
  useEffect(() => {
    if (!apiKey || apiKey === "your_finnhub_api_key_here") {
      setIsLive(false);
      return;
    }

    const futuresSymbols = Object.keys(SYMBOL_MAP);
    const initialQuotes = new Map<string, MarketQuote>();

    const fetchInitialData = async () => {
      try {
        const promises = futuresSymbols.map(async (futureSym) => {
          const proxySym = SYMBOL_MAP[futureSym];
          const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${proxySym}&token=${apiKey}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          
          // Apply multiplier to fit the contract price level
          const mult = MULTIPLIERS[proxySym] || 1;
          const currentPrice = data.c * mult;
          const prevClose = data.pc * mult;
          
          initialQuotes.set(futureSym, {
            price: currentPrice,
            changePct: data.dp || 0,
            prevClose: prevClose,
            lastUpdated: Date.now()
          });
        });

        await Promise.all(promises);
        
        // Seed the initial state
        setQuotes(new Map(initialQuotes));
        quotesRef.current = initialQuotes;
        setIsLive(true);

        // Seed the chart prices for MNQ ( Nasdaq ) using its initial price
        const mnqQuote = initialQuotes.get("MNQ");
        if (mnqQuote) {
          const targetPrice = mnqQuote.price;
          // Generate a smooth simulated historical walk ending at the actual current price
          const generatedHistory: number[] = [];
          let current = targetPrice - 180; // Start slightly lower
          for (let i = 0; i < 25; i++) {
            const step = (Math.random() - 0.45) * 15; // Positive drift
            current = Math.round(current + step);
            generatedHistory.push(current);
          }
          // Make sure the last item is exactly our live price
          generatedHistory[generatedHistory.length - 1] = Math.round(targetPrice);
          setChartPrices(generatedHistory);
          chartPricesRef.current = generatedHistory;
        }
      } catch (err) {
        console.warn("Failed to fetch initial market data from Finnhub:", err);
        setIsLive(false);
      }
    };

    fetchInitialData();
  }, [apiKey]);

  // 2. WebSocket connection to stream real-time price updates
  useEffect(() => {
    if (!isLive || !apiKey) return;

    const proxyToFutureMap = new Map<string, string>();
    Object.entries(SYMBOL_MAP).forEach(([future, proxy]) => {
      proxyToFutureMap.set(proxy, future);
    });

    let intervalId: any = null;

    const connectWebSocket = () => {
      if (intervalId) {
        clearInterval(intervalId);
      }

      const socket = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);
      socketRef.current = socket;

      socket.addEventListener("open", () => {
        // Subscribe to all proxy symbols
        Object.values(SYMBOL_MAP).forEach((proxySym) => {
          socket.send(JSON.stringify({ type: "subscribe", symbol: proxySym }));
        });
      });

      // Buffer incoming ticks and throttle state updates to prevent excessive re-renders
      let updatePending = false;
      const processUpdates = () => {
        if (!updatePending) return;
        updatePending = false;
        
        // Flush quotes map to state
        setQuotes(new Map(quotesRef.current));
        
        // Update chart prices state if MNQ (QQQ proxy) was updated
        setChartPrices([...chartPricesRef.current]);
      };

      // Periodic flush every 500ms
      intervalId = setInterval(processUpdates, 500);

      socket.addEventListener("message", (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type !== "trade" || !message.data) return;

          message.data.forEach((trade: any) => {
            const proxySym = trade.s;
            const futureSym = proxyToFutureMap.get(proxySym);
            if (!futureSym) return;

            const rawPrice = trade.p;
            const mult = MULTIPLIERS[proxySym] || 1;
            const livePrice = rawPrice * mult;

            const existing = quotesRef.current.get(futureSym);
            const prevClose = existing?.prevClose || livePrice;
            const nextChangePct = prevClose ? ((livePrice - prevClose) / prevClose) * 100 : 0;

            quotesRef.current.set(futureSym, {
              price: livePrice,
              changePct: nextChangePct,
              prevClose: prevClose,
              lastUpdated: trade.t
            });

            // Update chart array if this is MNQ (Nasdaq)
            if (futureSym === "MNQ") {
              const currentHistory = [...chartPricesRef.current];
              if (currentHistory.length > 0) {
                // Keep history size capped at 25 points
                const nextHistory = [...currentHistory.slice(1), Math.round(livePrice)];
                chartPricesRef.current = nextHistory;
              }
            }

            updatePending = true;
          });
        } catch (e) {
          console.error("Error processing WebSocket message:", e);
        }
      });

      socket.addEventListener("error", (err) => {
        console.error("WebSocket connection error:", err);
      });

      socket.addEventListener("close", () => {
        console.warn("WebSocket closed. Attempting reconnect in 5 seconds...");
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
        setTimeout(() => {
          if (socketRef.current === socket) {
            connectWebSocket();
          }
        }, 5000);
      });
    };

    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isLive, apiKey]);

  return {
    quotes,
    chartPrices,
    isLive
  };
}
