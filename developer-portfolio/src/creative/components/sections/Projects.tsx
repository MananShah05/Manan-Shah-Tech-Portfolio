"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDown, Play, X, ChevronDown, ChevronUp, FolderOpen } from "lucide-react";
import { resumeData } from "@/creative/lib/resume-data";
import type { ProjectVideo, ProjectFolder, ProjectDesign } from "@/creative/lib/resume-data";
import { ProjectCard3D } from "./ProjectCard3D";
import { useGPUTier } from "@/hooks/useGPUTier";

/* ── helpers ─────────────────────────────────────────────────────── */


/** Extract YouTube video ID from various URL formats */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/** Convert any YT URL to an embeddable URL */
function toEmbedUrl(src: string): string {
  const id = extractYouTubeId(src);
  if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  return src;
}

/* ── sub-components ──────────────────────────────────────────────── */

function StatusBadge({ status }: { status: string }) {
  const isActive = status === "Shipped";
  const isProgress = status === "In Progress";

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-1.5 text-[10px] uppercase tracking-widest font-mono border-2 ${
        isActive
          ? "border-accent bg-accent/10 text-accent"
          : isProgress
            ? "border-orange bg-orange/10 text-orange"
            : "border-border bg-muted/50 text-ink-muted"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 ${isActive ? "bg-accent" : isProgress ? "bg-orange animate-pulse" : "bg-ink-muted"}`}
      />
      {status}
    </div>
  );
}

/** YouTube video lightbox modal */
function VideoModal({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-[90vw] max-w-4xl aspect-video"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors z-10"
          >
            <X size={28} />
          </button>
          <iframe
            src={toEmbedUrl(src)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-2 border-border"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/** Single video thumbnail card */
function VideoThumbnail({
  video,
  onClick,
}: {
  video: ProjectVideo;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="group/thumb relative aspect-video overflow-hidden border-2 border-border hover:border-accent transition-colors duration-300 cursor-pointer bg-muted"
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-110"
      />
      {/* Play overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/20 transition-colors duration-300 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center group-hover/thumb:scale-110 transition-transform duration-300 shadow-lg">
          <Play size={20} className="text-accent-ink ml-0.5" fill="currentColor" />
        </div>
      </div>
      {/* Title bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <p className="text-[10px] md:text-xs text-white font-mono uppercase tracking-wider truncate">
          {video.title}
        </p>
      </div>
    </motion.button>
  );
}

/** Folder accordion for grouped videos (e.g. Streax India, Expertrons) */
function FolderSection({
  folder,
  onVideoClick,
}: {
  folder: ProjectFolder;
  onVideoClick: (src: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors duration-200"
      >
        <FolderOpen size={16} className="text-accent shrink-0" />
        <span className="font-mono text-xs uppercase tracking-widest text-ink flex-1 text-left">
          {folder.title}
        </span>
        <span className="font-mono text-[10px] text-ink-muted mr-2">
          {folder.videos.length} videos
        </span>
        {isOpen ? (
          <ChevronUp size={14} className="text-ink-muted" />
        ) : (
          <ChevronDown size={14} className="text-ink-muted" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-3 pt-0">
              {folder.videos.map((video, vi) => (
                <VideoThumbnail
                  key={vi}
                  video={video}
                  onClick={() => onVideoClick(video.src)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Figma design link card */
function DesignCard({ design }: { design: ProjectDesign }) {
  const isAdidas = design.title.toLowerCase().includes("adidas");
  const isRog = design.title.toLowerCase().includes("rog");

  return (
    <a
      href={design.src}
      target="_blank"
      rel="noreferrer"
      className="group/design flex flex-col border-2 border-border bg-surface hover:border-accent hover:-translate-y-1 transition-all duration-300 hover:shadow-[4px_4px_0px_0px_var(--color-accent)] overflow-hidden h-full min-h-[200px]"
    >
      {/* Mini Mockup Header Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/20 group-hover/design:bg-accent/5 transition-colors duration-300">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        </div>
        <span className="font-mono text-[9px] text-ink-muted uppercase tracking-wider">
          figma.com
        </span>
      </div>

      {/* Abstract Design Grid Preview (Visual weight) */}
      <div className="flex-1 bg-bg p-4 flex items-center justify-center relative overflow-hidden group-hover/design:bg-surface transition-colors duration-300">
        {/* Subtle grid lines background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:12px_12px]" />

        {/* Abstract UI wireframe shapes */}
        <div className="w-full h-full flex flex-col gap-2 opacity-60 group-hover/design:opacity-100 transition-opacity duration-300 relative z-10 justify-center">
          {isAdidas ? (
            <div className="space-y-2">
              <div className="w-2/3 h-3 bg-ink/10 rounded" />
              <div className="flex gap-2">
                <div className="w-12 h-12 bg-accent/20 border border-accent/20 flex items-center justify-center text-[10px] font-bold text-accent">AD</div>
                <div className="flex-1 space-y-1.5">
                  <div className="w-full h-2 bg-ink/10 rounded" />
                  <div className="w-5/6 h-2 bg-ink/10 rounded" />
                  <div className="w-4/6 h-2 bg-ink/10 rounded" />
                </div>
              </div>
            </div>
          ) : isRog ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="w-8 h-2 bg-ink/10 rounded" />
                <div className="w-12 h-3 bg-red-500/10 border border-red-500/20 rounded" />
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="h-8 bg-ink/5 border border-border/30 rounded" />
                <div className="h-8 bg-ink/5 border border-border/30 rounded" />
                <div className="h-8 bg-ink/5 border border-border/30 rounded" />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-full h-6 bg-ink/5 border border-border/20 rounded flex items-center px-2 justify-between">
                <div className="w-10 h-2 bg-ink/10 rounded" />
                <div className="w-3 h-3 bg-accent/30 rounded-full" />
              </div>
              <div className="flex gap-2">
                <div className="w-1/2 h-2 bg-ink/10 rounded" />
                <div className="w-1/3 h-2 bg-ink/10 rounded" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Info Footer */}
      <div className="p-4 border-t border-border bg-surface flex items-center justify-between gap-3 group-hover/design:bg-accent/5 transition-colors duration-300">
        <div className="min-w-0">
          <p className="font-display text-sm font-bold uppercase tracking-tight text-ink truncate">
            {design.title}
          </p>
          <p className="text-[10px] text-ink-muted font-mono mt-0.5 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Figma Prototype
          </p>
        </div>
        <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-ink-muted group-hover/design:text-accent group-hover/design:border-accent transition-all duration-300 bg-bg shrink-0">
          <ArrowUpRight size={14} />
        </div>
      </div>
    </a>
  );
}

/** Video gallery section below each project card */
function ProjectMediaGallery({
  project,
  onVideoClick,
  isExpanded,
  onToggle,
}: {
  project: (typeof resumeData.projects)[number];
  onVideoClick: (src: string) => void;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const videos = (project as Record<string, unknown>).videos as ProjectVideo[] | undefined;
  const folders = (project as Record<string, unknown>).folders as ProjectFolder[] | undefined;
  const designs = (project as Record<string, unknown>).designs as ProjectDesign[] | undefined;

  const hasMedia = (videos && videos.length > 0) || (folders && folders.length > 0) || (designs && designs.length > 0);

  if (!hasMedia) return null;

  const totalCount =
    (videos?.length || 0) +
    (folders?.reduce((acc, f) => acc + f.videos.length, 0) || 0) +
    (designs?.length || 0);

  return (
    <motion.div
      id={`gallery-${project.slug}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-x-2 border-b-2 border-border bg-bg"
    >
      {/* Expandable header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <Play size={14} className="text-accent" />
          <span className="font-mono text-xs uppercase tracking-widest text-ink">
            Media Gallery
          </span>
          <span className="font-mono text-[10px] text-ink-muted border border-border px-2 py-0.5">
            {totalCount} items
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp size={16} className="text-ink-muted" />
        ) : (
          <ChevronDown size={16} className="text-ink-muted" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-4">
              {/* Direct videos */}
              {videos && videos.length > 0 && (
                <div>
                  {folders && folders.length > 0 && (
                    <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-2">
                      Highlights
                    </p>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {videos.map((video, vi) => (
                      <VideoThumbnail
                        key={vi}
                        video={video}
                        onClick={() => onVideoClick(video.src)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Folder groups */}
              {folders && folders.length > 0 && (
                <div className="space-y-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                    Project Folders
                  </p>
                  {folders.map((folder, fi) => (
                    <FolderSection
                      key={fi}
                      folder={folder}
                      onVideoClick={onVideoClick}
                    />
                  ))}
                </div>
              )}

              {/* Figma designs */}
              {designs && designs.length > 0 && (
                <div className="space-y-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                    Design Prototypes
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {designs.map((design, di) => (
                      <DesignCard key={di} design={design} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── main component ──────────────────────────────────────────────── */

export function Projects() {
  const projects = resumeData.projects;
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const gpuTier = useGPUTier(); // RULE 2: Performance gates
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const [expandedGalleries, setExpandedGalleries] = useState<Record<string, boolean>>({});

  const handleToggleGallery = useCallback((slug: string) => {
    setExpandedGalleries((prev) => ({ ...prev, [slug]: !prev[slug] }));
  }, []);

  const handleViewGallery = useCallback((slug: string) => {
    // Expand the gallery
    setExpandedGalleries((prev) => ({ ...prev, [slug]: true }));
    // Scroll to it
    setTimeout(() => {
      const el = document.getElementById(`gallery-${slug}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);
  }, []);

  const handleVideoClick = useCallback((src: string) => {
    setActiveVideo(src);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveVideo(null);
  }, []);

  return (
    <section id="projects" className="pt-24 pb-20 lg:pt-32 lg:pb-24 relative bg-bg">
      {/* Video Lightbox */}
      {activeVideo && (
        <VideoModal src={activeVideo} onClose={handleCloseModal} />
      )}

      <div className="max-w-[95vw] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-24 space-y-6"
        >
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter leading-[0.85] text-ink -ml-1">
            Projects.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-px">
          {projects.map((project, i) => {
            const isFeatured = i === 0;
            const isEven = i % 2 === 0;

            return (
              <div key={project.slug}>
                {/* Main project card */}
                {/* RULE 5: Hover enter 200ms, exit 150ms */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onMouseEnter={() => setHoveredCard(project.slug)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} bg-bg hover:bg-accent hover:text-accent-ink transition-all duration-300 border-2 border-border`}
                  style={{ transitionDuration: "200ms" }}
                >
                  {/* Project Visual */}
                  {/* RULE 3: Framer motion owns layout, R3F owns the Canvas inside */}
                  <div
                    className={`w-full ${isFeatured ? "lg:w-7/12" : "lg:w-1/2"} aspect-[4/3] relative border-b-2 lg:border-b-0 ${isEven ? "lg:border-r-2 lg:border-l-0" : "lg:border-l-2 lg:border-r-0"} border-border group-hover:border-accent overflow-hidden transition-colors duration-300`}
                  >
                    <ProjectCard3D
                      projectSlug={project.slug}
                      isHovered={hoveredCard === project.slug}
                      gpuTier={gpuTier}
                    />
                  </div>

                  {/* Project Info */}
                  <div
                    className={`w-full ${isFeatured ? "lg:w-5/12" : "lg:w-1/2"} flex flex-col justify-center p-8 lg:p-12 space-y-6`}
                  >
                    <div className="space-y-4">
                      <StatusBadge status={project.status} />
                      <h3 className="font-display text-2xl md:text-3xl lg:text-5xl font-bold uppercase tracking-tighter leading-[0.9] group-hover:text-accent-ink transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>


                    <p className="text-ink-muted group-hover:text-accent-ink/70 text-lg leading-tight transition-colors duration-300">
                      {project.shortDesc}
                    </p>

                    {/* Highlight */}
                    <div className="p-4 border-2 border-border group-hover:border-accent-ink/20 transition-colors duration-300">
                      <p className="text-sm font-medium leading-tight group-hover:text-accent-ink transition-colors duration-300">
                        <span className="text-accent group-hover:text-accent-ink mr-2 transition-colors duration-300">
                          ✦
                        </span>
                        {project.highlight}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-ink-muted group-hover:text-accent-ink/60 text-xs font-mono uppercase tracking-wider border-2 border-border group-hover:border-accent-ink/20 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-6 pt-4">
                      <button
                        onClick={() => handleViewGallery(project.slug)}
                        className="group/btn flex items-center gap-2 px-6 py-3 bg-ink group-hover:bg-accent-ink text-bg group-hover:text-accent text-sm font-bold uppercase tracking-tighter transition-all duration-300 cursor-pointer"
                      >
                        View Gallery
                        <ArrowDown
                          size={16}
                          className="group-hover/btn:translate-y-1 transition-transform duration-300"
                        />
                      </button>

                      <div className="flex items-center gap-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-mono uppercase tracking-widest text-ink-muted group-hover:text-accent-ink hover:text-accent transition-colors duration-300"
                          >
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Video Gallery - below project card */}
                <ProjectMediaGallery
                  project={project}
                  onVideoClick={handleVideoClick}
                  isExpanded={!!expandedGalleries[project.slug]}
                  onToggle={() => handleToggleGallery(project.slug)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
