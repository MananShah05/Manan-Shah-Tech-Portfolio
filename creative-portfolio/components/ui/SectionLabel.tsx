export function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-mono text-xs text-accent tracking-widest uppercase mb-4 font-bold">
      {children}
    </div>
  );
}
