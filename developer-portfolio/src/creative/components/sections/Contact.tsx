"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { resumeData } from "@/creative/lib/resume-data";
import { supabase } from "@/lib/supabase";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: data.name,
            email: data.email,
            subject: "Creative Portfolio Contact",
            message: data.message,
          }
        ]);

      if (error) {
        throw error;
      }

      setSubmitStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-32 lg:py-48 relative overflow-hidden bg-bg"
    >
      <div className="max-w-[95vw] mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left: CTA Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div className="space-y-8">
              <h2 className="font-display text-[clamp(2.5rem,5.5vw,5rem)] font-bold uppercase tracking-tighter leading-[0.85] text-ink -ml-1 text-balance">
                Let&apos;s craft
                <br />
                the{" "}
                <span className="text-ink-muted">extraordinary.</span>
              </h2>
              <p className="text-xl text-ink-muted font-light max-w-md leading-tight text-balance">
                Whether it&apos;s a cinematic video campaign, an immersive 3D mockup,
                or a premium visual layout, I&apos;m ready to collaborate.
              </p>
            </div>

            <div className="mt-16 pt-8 border-t border-border space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-border">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
                </span>
                <span className="text-sm font-bold uppercase tracking-wider text-ink">
                  Available for Opportunities
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href={`mailto:${resumeData.personal.email}`}
                  className="group flex items-center gap-4 text-2xl font-display font-bold uppercase tracking-tighter text-ink hover:text-accent transition-colors duration-300 w-fit"
                >
                  <Mail
                    size={24}
                    className="text-border group-hover:text-accent transition-colors duration-300"
                  />
                  {resumeData.personal.email}
                </a>
                <div className="flex items-center gap-3 pt-4 flex-wrap">
                  {[
                    {
                      ariaLabel: "LinkedIn",
                      href: resumeData.personal.linkedin,
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      ),
                    },
                    {
                      ariaLabel: "GitHub",
                      href: resumeData.personal.github,
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      ),
                    },
                    {
                      ariaLabel: "Behance",
                      href: "https://www.behance.net/mananshah01",
                      icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="9.8" />
                          <path
                            d="M22.3 8.35h-4.88c-.12-.85-.8-1.46-1.74-1.46-.93 0-1.63.59-1.77 1.46h8.39zm1.7 2.45h-10.1c.14 1.38 1.2 2.37 2.67 2.37 1.28 0 2.22-.64 2.51-1.62h2.24c-.45 2.14-2.28 3.52-4.75 3.52-3 0-4.9-2.1-4.9-5 0-3 1.9-5.1 4.78-5.1 2.87 0 4.88 2.05 4.88 5c0 .35-.04.6-.33.83zm-15.17-5.5h-5.26v11.4h5.36c2.47 0 4.16-1.16 4.16-3.07 0-1.41-.95-2.3-2.27-2.61v-.09c1-.37 1.66-1.17 1.66-2.42.01-1.92-1.59-3.21-3.65-3.21zm-2.73 4.2h2.51c1.07 0 1.63.49 1.63 1.27s-.56 1.27-1.63 1.27h-2.51v-2.54zm0 6.69v-2.83h2.62c1.16 0 1.76.54 1.76 1.41s-.6 1.42-1.76 1.42h-2.62zm15.17-10.19h-4.88v1.11h4.88v-1.11z"
                            fill="currentColor"
                            stroke="none"
                            transform="translate(4.5, 5.7) scale(0.58)"
                          />
                        </svg>
                      ),
                    },
                    {
                      ariaLabel: "X (Twitter)",
                      href: "https://x.com/01Mananshah",
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                      ),
                    },
                    {
                      ariaLabel: "YouTube",
                      href: "https://www.youtube.com/@mananshahstudio",
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"></path><polygon points="10 15 15 12 10 9" fill="currentColor"></polygon></svg>
                      ),
                    },
                    {
                      ariaLabel: "Instagram",
                      href: "https://www.instagram.com/transcend.frames/",
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      ),
                    },
                  ].map((channel) => (
                    <a
                      key={channel.ariaLabel}
                      href={channel.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={channel.ariaLabel}
                      className="w-10 h-10 border border-border flex items-center justify-center text-ink-muted hover:text-accent hover:border-accent transition-all duration-300"
                    >
                      {channel.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-5"
          >
            <div className="border-2 border-border p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-mono tracking-widest uppercase text-ink-muted px-0"
                  >
                    What&apos;s your name?
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="MANAN SHAH"
                    className="w-full bg-transparent border-b-2 border-border px-0 py-4 text-2xl text-ink font-bold uppercase tracking-tighter placeholder-muted focus:outline-none focus:border-accent transition-colors duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-mono tracking-widest uppercase text-ink-muted px-0"
                  >
                    What&apos;s your email?
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="MANAN@GMAIL.COM"
                    className="w-full bg-transparent border-b-2 border-border px-0 py-4 text-2xl text-ink font-bold uppercase tracking-tighter placeholder-muted focus:outline-none focus:border-accent transition-colors duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-mono tracking-widest uppercase text-ink-muted px-0"
                  >
                    How can I help you?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="TELL ME ABOUT YOUR PROJECT..."
                    className="w-full bg-transparent border-b-2 border-border px-0 py-4 text-2xl text-ink font-bold uppercase tracking-tighter placeholder-muted focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || submitStatus === "success"}
                    className="group w-full flex items-center justify-between bg-ink text-bg px-8 py-5 font-bold text-sm uppercase tracking-tighter hover:bg-accent hover:text-accent-ink transition-all duration-300 disabled:opacity-80 active:scale-[0.98]"
                  >
                    <span className="text-lg font-medium">
                      {isSubmitting
                        ? "Sending..."
                        : submitStatus === "success"
                          ? "Message Sent"
                          : "Send Message"}
                    </span>
                    {submitStatus === "success" ? (
                      <CheckCircle2 size={24} />
                    ) : (
                      <div className="w-10 h-10 border-2 border-bg/20 group-hover:border-accent-ink/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <ArrowUpRight size={20} />
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
