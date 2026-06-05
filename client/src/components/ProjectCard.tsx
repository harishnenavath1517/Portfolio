import { Github, ExternalLink, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";

export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  tech: string[];
  category: string;
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  hasCaseStudy: boolean;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      className="card-surface p-6 flex flex-col gap-4 group transition-all duration-200 hover:border-opacity-60"
      style={{
        borderColor: "var(--color-line)",
        transition: "border-color 200ms ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgb(110 139 255 / 0.4)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-line)";
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="tag-neutral">{project.category}</span>
            {project.featured && (
              <span className="tag">Featured</span>
            )}
          </div>
          <h3
            className="text-base font-semibold leading-snug"
            style={{ color: "var(--color-ink)" }}
          >
            {project.title}
          </h3>
        </div>
      </div>

      {/* Tagline */}
      <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
        {project.tagline}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.slice(0, 5).map((t) => (
          <span key={t} className="tag-neutral">
            {t}
          </span>
        ))}
        {project.tech.length > 5 && (
          <span className="tag-neutral">+{project.tech.length - 5}</span>
        )}
      </div>

      {/* Footer links */}
      <div className="flex items-center gap-3 mt-auto pt-2 border-t" style={{ borderColor: "var(--color-line)" }}>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-150"
            style={{ color: "var(--color-muted)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--color-ink)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--color-muted)";
            }}
            aria-label={`GitHub — ${project.title}`}
          >
            <Github size={13} />
            GitHub
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium transition-colors duration-150"
            style={{ color: "var(--color-muted)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--color-ink)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--color-muted)";
            }}
            aria-label={`Live demo — ${project.title}`}
          >
            <ExternalLink size={13} />
            Live
          </a>
        )}
        {project.hasCaseStudy && (
          <Link
            to={`/projects/${project.slug}`}
            className="flex items-center gap-1.5 text-xs font-medium ml-auto transition-colors duration-150"
            style={{ color: "var(--color-accent)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--color-accent-hover)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
            }}
          >
            <BookOpen size={13} />
            Case Study
            <ArrowRight size={11} />
          </Link>
        )}
      </div>
    </motion.article>
  );
}
