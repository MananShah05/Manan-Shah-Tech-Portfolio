import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import CTAButton from "./CTAButton";
import ContactForm from "./ContactForm";
import { Mail, Globe, Code2, MapPin } from "lucide-react";

const links = [
  {
    label: "mananshah.ms.01@gmail.com",
    href: "mailto:mananshah.ms.01@gmail.com",
    icon: <Mail size={16} strokeWidth={2} />,
  },
  {
    label: "linkedin.com/in/mananshah001",
    href: "https://www.linkedin.com/in/mananshah001/",
    icon: <Globe size={16} strokeWidth={2} />,
  },
  {
    label: "x.com/01Mananshah",
    href: "https://x.com/01Mananshah",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    label: "github.com/Technova100",
    href: "https://github.com/Technova100",
    icon: <Code2 size={16} strokeWidth={2} />,
  }
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <SectionHeading
          label="10 — Contact"
          title="Let's build something intelligent."
          subtitle="I am actively seeking AI/ML internships, software engineering roles, and full-time opportunities. If you are building at the edge of applied intelligence, I would love to contribute."
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mt-8 md:mt-16 items-stretch">
          
          {/* Left Column: Direct links & Info */}
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

              <div className="relative z-10">
                <h3 className="font-serif text-2xl md:text-3xl mb-8" style={{ color: "var(--fg)" }}>
                  Direct Connection
                </h3>
                
                <div className="flex flex-col gap-5 mb-10">
                  {links.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-4 text-[14px] transition-colors duration-300"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      <span className="w-11 h-11 rounded-xl flex items-center justify-center glass-light shadow-sm" style={{ color: "var(--accent)" }}>
                        {link.icon}
                      </span>
                      <span className="font-medium tracking-wide">{link.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 relative z-10 mt-auto">
                <CTAButton href="mailto:mananshah.ms.01@gmail.com" variant="primary" icon="mail">
                  Email Me
                </CTAButton>
                <CTAButton href="#" variant="secondary" icon="download">
                  Resume
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
