import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { fetchProjects, type Project } from "@/lib/api";
import { staggerContainer } from "@/lib/animations";
import { Loader2, AlertCircle } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div style={{ backgroundColor: "var(--color-base)" }}>
      <div className="container py-20 md:py-28">
        {/* Header */}
        <Reveal className="mb-16">
          <span className="eyebrow block mb-3">Portfolio</span>
          <h1 className="section-heading mb-4">Projects</h1>
          <p className="text-base max-w-xl" style={{ color: "var(--color-muted)" }}>
            A selection of things I've built — from systems-level tools to AI-powered applications.
          </p>
        </Reveal>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2
              size={28}
              className="animate-spin"
              style={{ color: "var(--color-accent)" }}
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            className="flex items-center gap-3 p-4 rounded-lg border"
            style={{
              borderColor: "rgb(248 113 113 / 0.3)",
              backgroundColor: "rgb(248 113 113 / 0.05)",
              color: "var(--color-error)",
            }}
          >
            <AlertCircle size={18} />
            <p className="text-sm">Failed to load projects. Please try again later.</p>
          </div>
        )}

        {/* Project grid */}
        {projects && projects.length > 0 && (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        )}

        {/* Empty state */}
        {projects && projects.length === 0 && (
          <div className="text-center py-20">
            <p style={{ color: "var(--color-muted)" }}>No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
