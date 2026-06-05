import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { fetchProject, type Project } from "@/lib/api";
import { Reveal } from "@/components/Reveal";
import { ArrowLeft, Github, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { staggerContainer, fadeUp } from "@/lib/animations";

export default function ProjectDetail() {
  const { slug = "" } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetchProject(slug)
      .then(setProject)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-base)" }}
      >
        <Loader2 size={28} className="animate-spin" style={{ color: "var(--color-accent)" }} />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-base)" }}
      >
        <div className="text-center max-w-md">
          <AlertCircle size={40} className="mx-auto mb-4" style={{ color: "var(--color-error)" }} />
          <h1 className="text-xl font-semibold mb-2" style={{ color: "var(--color-ink)" }}>
            Project Not Found
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            This project doesn't exist or doesn't have a case study.
          </p>
          <Link to="/projects" className="btn-accent">
            <ArrowLeft size={14} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  if (!project.hasCaseStudy || !project.caseStudy) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-base)" }}
      >
        <div className="text-center max-w-md">
          <h1 className="text-xl font-semibold mb-2" style={{ color: "var(--color-ink)" }}>
            No Case Study Available
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            This project doesn't have a detailed case study yet.
          </p>
          <Link to="/projects" className="btn-accent">
            <ArrowLeft size={14} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const cs = project.caseStudy;

  return (
    <div style={{ backgroundColor: "var(--color-base)" }}>
      <div className="container py-20 md:py-28 max-w-3xl">
        {/* Back link */}
        <Reveal className="mb-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: "var(--color-muted)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--color-ink)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--color-muted)";
            }}
          >
            <ArrowLeft size={14} />
            All Projects
          </Link>
        </Reveal>

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <motion.div variants={fadeUp} className="mb-3 flex flex-wrap gap-2">
            <span className="tag-neutral">{project.category}</span>
            {project.featured && <span className="tag">Featured</span>}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "var(--color-ink)" }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg mb-6"
            style={{ color: "var(--color-muted)" }}
          >
            {project.tagline}
          </motion.p>

          {/* Tech tags */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t: string) => (
              <span key={t} className="tag-neutral">
                {t}
              </span>
            ))}
          </motion.div>

          {/* Links */}
          <motion.div variants={fadeUp} className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-sm"
              >
                <Github size={14} />
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent text-sm"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div
          className="h-px mb-12"
          style={{ backgroundColor: "var(--color-line)" }}
        />

        {/* Case study sections */}
        <div className="space-y-12 prose-dark">
          {cs.problem && (
            <Reveal>
              <section>
                <h2
                  className="font-mono text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "var(--color-accent)" }}
                >
                  The Problem
                </h2>
                <p style={{ color: "var(--color-muted)" }}>{cs.problem}</p>
              </section>
            </Reveal>
          )}

          {cs.approach && (
            <Reveal>
              <section>
                <h2
                  className="font-mono text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "var(--color-accent)" }}
                >
                  Approach
                </h2>
                <p style={{ color: "var(--color-muted)" }}>{cs.approach}</p>
              </section>
            </Reveal>
          )}

          {cs.architecture && (
            <Reveal>
              <section>
                <h2
                  className="font-mono text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "var(--color-accent)" }}
                >
                  Architecture
                </h2>
                <p style={{ color: "var(--color-muted)" }}>{cs.architecture}</p>
              </section>
            </Reveal>
          )}

          {cs.outcome && (
            <Reveal>
              <section
                className="card-surface p-6"
                style={{ borderColor: "rgb(110 139 255 / 0.2)" }}
              >
                <h2
                  className="font-mono text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "var(--color-accent)" }}
                >
                  Outcome
                </h2>
                <p style={{ color: "var(--color-ink)" }}>{cs.outcome}</p>
              </section>
            </Reveal>
          )}
        </div>

        {/* Footer nav */}
        <Reveal className="mt-16 pt-8 border-t" delay={0.1}>
          <Link to="/projects" className="btn-ghost">
            <ArrowLeft size={14} />
            Back to All Projects
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
