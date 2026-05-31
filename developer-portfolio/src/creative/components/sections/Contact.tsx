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
              <div className="inline-flex items-center gap-3">
                <span className="font-mono text-xs tracking-widest text-accent uppercase">
                  09. Direct Connection
                </span>
              </div>
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
                <div className="flex items-center gap-6 pt-4">
                  <a
                    href={resumeData.personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-mono tracking-widest uppercase text-ink-muted hover:text-accent transition-colors duration-300"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={resumeData.personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-mono tracking-widest uppercase text-ink-muted hover:text-accent transition-colors duration-300"
                  >
                    GitHub
                  </a>
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
                    placeholder="JOHN DOE"
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
                    placeholder="JOHN@EXAMPLE.COM"
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
