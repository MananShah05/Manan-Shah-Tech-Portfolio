"use client";

import { motion } from "framer-motion";
import { resumeData } from "@/creative/lib/resume-data";
import { Users, User } from "lucide-react";

export function Hackathons() {
  const events = resumeData.hackathons;

  return (
    <section id="hackathons" className="py-32 lg:py-48 bg-bg">
      <div className="max-w-[95vw] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 space-y-6"
        >
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.9] text-ink">
            48-hour sprints.
            <br />
            Real deliverables.
          </h2>
        </motion.div>

        <div className="space-y-px border-2 border-border">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative flex flex-col md:flex-row gap-6 md:gap-12 bg-bg hover:bg-accent hover:text-accent-ink transition-all duration-300 p-8"
            >
              {/* Date */}
              <div className="md:w-32 shrink-0">
                <span className="text-sm font-mono tracking-widest uppercase text-ink-muted group-hover:text-accent-ink/60 transition-colors duration-300">
                  {event.date}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tighter group-hover:text-accent-ink transition-colors duration-300">
                    {event.event}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-ink-muted group-hover:text-accent-ink/60 mt-1 transition-colors duration-300">
                    <span>{event.organizer}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      {event.solo ? (
                        <User size={14} />
                      ) : (
                        <Users size={14} />
                      )}
                      {event.solo ? "Solo" : "Team"}
                    </span>
                  </div>
                </div>

                <div className="px-4 py-1.5 border-2 border-border group-hover:border-accent-ink/20 text-xs font-bold uppercase tracking-wider text-ink group-hover:text-accent-ink transition-colors duration-300">
                  {event.outcome}
                </div>
              </div>

              <p className="text-ink-muted group-hover:text-accent-ink/60 italic border-l-2 border-border group-hover:border-accent-ink/20 pl-4 transition-colors duration-300">
                &quot;{event.built}&quot;
              </p>
            </motion.div>
          ))}

          {/* Future Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.5,
              delay: events.length * 0.15,
            }}
            className="relative flex items-center gap-4 p-8 border-2 border-dashed border-border"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange" />
            </span>
            <span className="text-sm font-mono text-ink-muted tracking-widest uppercase">
              Ready for the next sprint
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
