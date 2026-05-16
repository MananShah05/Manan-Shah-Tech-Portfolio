import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, MessageSquare, Tag } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("https://formsubmit.co/ajax/mananshah.ms.01@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 5000);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
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
      className="glass-light rounded-3xl p-6 md:p-10 w-full h-full flex flex-col justify-center"
      style={{ border: "1px solid var(--glass-border)" }}
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
          >
            <Send size={22} style={{ color: "var(--accent)" }} />
          </motion.div>
          <h4 className="font-semibold text-lg" style={{ color: "var(--fg)" }}>
            Message sent
          </h4>
          <p className="text-sm mt-1" style={{ color: "var(--fg-subtle)" }}>
            Thanks for reaching out. I will get back to you soon.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
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

          <motion.button
            type="submit"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition-colors"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <Send size={15} strokeWidth={2.5} />
            Send Message
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}
