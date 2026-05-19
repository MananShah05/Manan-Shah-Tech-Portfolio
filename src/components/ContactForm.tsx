import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, MessageSquare, Tag, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Insert form details into the 'contacts' table in Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }
        ]);

      if (error) {
        throw error;
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 5000);
    } catch (error: any) {
      console.error("Supabase Error:", error);
      setSubmitError(error.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full rounded-xl px-4 py-3.5 text-sm font-medium outline-none transition-all duration-300";
  const inputStyle = {
    backgroundColor: "rgba(26, 26, 24, 0.03)",
    border: "1px solid var(--glass-border)",
    color: "var(--fg)",
  };
  const inputFocusStyle = {
    backgroundColor: "rgba(26, 26, 24, 0.05)",
    border: "1px solid var(--accent)",
    boxShadow: "0 0 0 3px var(--accent-glow)",
  };

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Your name",
      icon: <User size={14} />,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "your@email.com",
      icon: <Mail size={14} />,
    },
    {
      name: "subject",
      label: "Subject",
      type: "text",
      placeholder: "What's this about?",
      icon: <Tag size={14} />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="glass-light rounded-3xl p-6 md:p-10 w-full h-full flex flex-col justify-center relative overflow-hidden"
      style={{ border: "1px solid var(--glass-border)" }}
    >
      <motion.div
        animate={submitError ? { x: [0, -4, 4, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full h-full flex flex-col justify-center"
      >
        <div className="text-center mb-8">
          <h3 className="font-serif text-xl md:text-2xl" style={{ color: "var(--fg)" }}>
            Send a message
          </h3>
          <p className="text-[13px] mt-1.5" style={{ color: "var(--fg-subtle)" }}>
            Have a project, role, or idea? Drop a note.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative text-center py-10 md:py-16 px-4 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Soft radial glow expanding outward */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.08, 0.15, 0.08] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"
            />

            {/* Subtle animated light sweep */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "200%" }}
              transition={{ duration: 2.5, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.04] to-transparent pointer-events-none"
            />

            {/* Circular Success Badge Container */}
            <div className="relative mb-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.1 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto border border-emerald-500/25 bg-emerald-500/[0.05] shadow-[0_0_25px_rgba(16,185,129,0.06)]"
              >
                <svg
                  className="w-6 h-6 text-emerald-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    d="M20 6L9 17L4 12"
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }
                      }
                    }}
                    initial="hidden"
                    animate="visible"
                  />
                </svg>
              </motion.div>

              {/* Gentle pulse ring */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.5 }}
                className="absolute inset-0 rounded-full border border-emerald-500/35 pointer-events-none"
              />
            </div>

            <motion.h4
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="font-serif text-xl md:text-2xl font-medium tracking-tight"
              style={{ color: "var(--fg)" }}
            >
              Message Sent
            </motion.h4>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              className="text-sm mt-3 max-w-sm mx-auto leading-relaxed"
              style={{ color: "var(--fg-subtle)" }}
            >
              Your message has been sent successfully. Thank you for reaching out.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="flex items-center justify-center gap-1.5 mt-8 text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/[0.05] dark:bg-emerald-500/[0.08] px-3.5 py-1.5 rounded-full border border-emerald-500/15"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Securely Delivered
            </motion.div>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            animate={{
              opacity: isSubmitting ? 0.6 : 1,
              filter: isSubmitting ? "blur(1.5px)" : "blur(0px)",
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {fields.slice(0, 2).map((field) => (
                <div key={field.name} className="relative">
                  <label
                    className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider mb-2"
                    style={{ color: "var(--fg-subtle)" }}
                  >
                    <span style={{ color: "var(--accent)", opacity: 0.5 }}>{field.icon}</span>
                    {field.label}
                  </label>
                  <motion.input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused(null)}
                    placeholder={field.placeholder}
                    required
                    className={inputBase}
                    style={
                      focused === field.name
                        ? { ...inputStyle, ...inputFocusStyle }
                        : inputStyle
                    }
                    whileTap={{ scale: 0.995 }}
                  />
                </div>
              ))}
            </div>

            <div className="relative">
              <label
                className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider mb-2"
                style={{ color: "var(--fg-subtle)" }}
              >
                <span style={{ color: "var(--accent)", opacity: 0.5 }}>
                  <Tag size={14} />
                </span>
                Subject
              </label>
              <motion.input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setFocused("subject")}
                onBlur={() => setFocused(null)}
                placeholder="What's this about?"
                required
                className={inputBase}
                style={
                  focused === "subject"
                    ? { ...inputStyle, ...inputFocusStyle }
                    : inputStyle
                }
                whileTap={{ scale: 0.995 }}
              />
            </div>

            <div className="relative">
              <label
                className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider mb-2"
                style={{ color: "var(--fg-subtle)" }}
              >
                <span style={{ color: "var(--accent)", opacity: 0.5 }}>
                  <MessageSquare size={14} />
                </span>
                Message
              </label>
              <motion.textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                placeholder="Tell me about your project, role, or idea..."
                required
                rows={5}
                className={`${inputBase} resize-none leading-relaxed`}
                style={
                  focused === "message"
                    ? { ...inputStyle, ...inputFocusStyle }
                    : inputStyle
                }
                whileTap={{ scale: 0.995 }}
              />
            </div>

            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 text-rose-600 dark:text-rose-400 text-xs font-medium bg-rose-500/[0.06] border border-rose-500/15 py-3 px-4 rounded-xl"
              >
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="flex-1 text-left">{submitError}</span>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? {} : { y: -2, scale: 1.01 }}
              whileTap={isSubmitting ? {} : { scale: 0.98 }}
              className={`w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 ${isSubmitting ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
                }`}
              style={{ backgroundColor: "var(--accent)" }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} strokeWidth={2.5} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={15} strokeWidth={2.5} />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </motion.div>
    </motion.div>
  );
}
