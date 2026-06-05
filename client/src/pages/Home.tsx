import { motion } from "motion/react";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router";
import { profile } from "@/data/profile";
import { staggerContainer, fadeUp } from "@/lib/animations";

export default function Home() {
  return (
    <section
      className="min-h-[calc(100vh-4rem)] flex items-center"
      style={{ backgroundColor: "var(--color-base)" }}
    >
      <div className="container py-24 md:py-32">
        <motion.div
          className="max-w-3xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="mb-5">
            <span className="eyebrow flex items-center gap-2">
              <Zap size={12} />
              {profile.eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
            style={{ color: "var(--color-ink)" }}
          >
            {profile.headline}
          </motion.h1>

          {/* Summary */}
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
            style={{ color: "var(--color-muted)" }}
          >
            {profile.summary}
          </motion.p>

          {/* Focus tags */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-10">
            {profile.focusTags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <Link to="/projects" className="btn-accent">
              View Projects
              <ArrowRight size={15} />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative grid lines */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
          style={{ zIndex: -1 }}
        >
          <div
            className="absolute top-1/4 right-0 w-px h-64 opacity-20"
            style={{ backgroundColor: "var(--color-line)" }}
          />
          <div
            className="absolute top-1/2 right-24 w-px h-48 opacity-10"
            style={{ backgroundColor: "var(--color-line)" }}
          />
        </div>
      </div>
    </section>
  );
}
