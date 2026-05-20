import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import CTAButton from "./CTAButton";
import ContactForm from "./ContactForm";
import { ArrowRight } from "lucide-react";

const socialChannels = [
  {
    ariaLabel: "LinkedIn",
    href: "https://www.linkedin.com/in/mananshah001/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    ),
  },
  {
    ariaLabel: "GitHub",
    href: "https://github.com/MananShah05",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    ),
  },
  {
    ariaLabel: "Behance",
    href: "https://www.behance.net/mananshah01",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.3 8.35h-4.88c-.12-.85-.8-1.46-1.74-1.46-.93 0-1.63.59-1.77 1.46h8.39zm1.7 2.45h-10.1c.14 1.38 1.2 2.37 2.67 2.37 1.28 0 2.22-.64 2.51-1.62h2.24c-.45 2.14-2.28 3.52-4.75 3.52-3 0-4.9-2.1-4.9-5 0-3 1.9-5.1 4.78-5.1 2.87 0 4.88 2.05 4.88 5c0 .35-.04.6-.33.83zm-15.17-5.5h-5.26v11.4h5.36c2.47 0 4.16-1.16 4.16-3.07 0-1.41-.95-2.3-2.27-2.61v-.09c1-.37 1.66-1.17 1.66-2.42.01-1.92-1.59-3.21-3.65-3.21zm-2.73 4.2h2.51c1.07 0 1.63.49 1.63 1.27s-.56 1.27-1.63 1.27h-2.51v-2.54zm0 6.69v-2.83h2.62c1.16 0 1.76.54 1.76 1.41s-.6 1.42-1.76 1.42h-2.62zm15.17-10.19h-4.88v1.11h4.88v-1.11z" />
      </svg>
    ),
  },
  {
    ariaLabel: "X (Twitter)",
    href: "https://x.com/01Mananshah",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
    ),
  },
  {
    ariaLabel: "YouTube",
    href: "https://www.youtube.com/@mananshahstudio",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"></path><polygon points="10 15 15 12 10 9" fill="currentColor"></polygon></svg>
    ),
  },
  {
    ariaLabel: "Instagram",
    href: "https://www.instagram.com/transcend.frames/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-12 md:py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <SectionHeading
          // label="Contact"
          title="Let's build the next iteration of applied intelligence."
          subtitle="I am actively seeking AI/ML internships, software engineering roles, and full-time opportunities. If you are building at the edge of applied intelligence, I would love to contribute."
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mt-8 md:mt-16 items-stretch">

          {/* Left Column: Merged Direct connection info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-light rounded-3xl p-8 relative overflow-hidden h-full flex flex-col justify-between"
            >
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"
                style={{ backgroundColor: "var(--accent)", opacity: 0.05 }}
              />
              <div
                className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"
                style={{ backgroundColor: "var(--secondary)", opacity: 0.05 }}
              />

              <div className="relative z-10 text-center lg:text-left">
                <h3 className="font-serif text-2xl md:text-3xl mb-4" style={{ color: "var(--fg)" }}>
                  Direct Connection
                </h3>
                <p className="text-sm mb-8 leading-relaxed" style={{ color: "var(--fg-subtle)" }}>
                  Have an interesting project, dynamic research collaboration, or active engineering role? Let's connect. I'm always open to discussing applied intelligence.
                </p>

                {/* ── Direct Email Block ── */}
                <div className="mb-8">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] block mb-2" style={{ color: "var(--fg-subtle)" }}>
                    Direct Email
                  </span>
                  <a
                    href="mailto:mananshah.ms.01@gmail.com"
                    className="group inline-flex items-center gap-2 text-base md:text-2xl font-mono tracking-tight font-semibold hover:text-[var(--accent)] transition-colors duration-300 mx-auto lg:mx-0"
                  >
                    <span className="relative">
                      mananshah.ms.01@gmail.com
                      <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </span>
                    <span className="w-7 h-7 rounded-full border border-[var(--glass-border)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-white group-hover:border-[var(--accent)] transition-all duration-300">
                      <ArrowRight size={12} className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </span>
                  </a>
                </div>

                {/* ── Live Status Indicator ── */}
                <div className="mb-8">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] block mb-2.5" style={{ color: "var(--fg-subtle)" }}>
                    Current Status
                  </span>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass-light border border-[var(--glass-border)] text-xs font-mono" style={{ color: "var(--fg-muted)" }}>
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                    <span>Based in Mumbai • Open to SWE & AI/ML Roles</span>
                  </div>
                </div>

                {/* ── Social Media Channels ── */}
                <div className="mb-10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] block mb-3" style={{ color: "var(--fg-subtle)" }}>
                    Connect Channels
                  </span>
                  <div className="flex flex-nowrap items-center gap-2 sm:gap-3 justify-center lg:justify-start">
                    {socialChannels.map((channel) => (
                      <a
                        key={channel.ariaLabel}
                        href={channel.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={channel.ariaLabel}
                        className="w-9 h-9 flex-shrink-0 rounded-xl glass-light flex items-center justify-center text-[var(--fg-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/[0.02] transition-all duration-300"
                      >
                        {channel.icon}
                      </a>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── Download Resume Button ── */}
              <div className="relative z-10 mt-auto flex justify-center lg:justify-start">
                <CTAButton
                  href="https://drive.google.com/drive/folders/1wxNikownhCSbqn9dmFCRce7f4ZjpgjuU?usp=sharing"
                  variant="primary"
                  icon="download"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  Download Full Resume
                </CTAButton>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}
