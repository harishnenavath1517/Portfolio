import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";
import { motion } from "motion/react";
import { staggerContainer, fadeUp } from "@/lib/animations";

export default function About() {
  return (
    <div style={{ backgroundColor: "var(--color-base)" }}>
      <div className="container py-20 md:py-28">
        {/* Page header */}
        <Reveal className="mb-16">
          <span className="eyebrow block mb-3">About Me</span>
          <h1 className="section-heading">Who I Am</h1>
        </Reveal>

        {/* Bio */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div className="space-y-5">
            {profile.bio.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Quick facts */}
          <Reveal delay={0.2}>
            <div
              className="card-surface p-6 h-fit"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <h2
                className="font-mono text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: "var(--color-accent)" }}
              >
                Quick Facts
              </h2>
              <dl className="space-y-4">
                {[
                  { label: "Degree", value: "B.Tech CSE — IIT" },
                  { label: "Graduating", value: "2025" },
                  { label: "Location", value: profile.location },
                  { label: "Focus", value: profile.focusTags.join(" · ") },
                  { label: "Status", value: "Open to opportunities" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <dt
                      className="font-mono text-xs uppercase tracking-wider"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {label}
                    </dt>
                    <dd className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        {/* Skills */}
        <Reveal className="mb-8">
          <span className="eyebrow block mb-3">Technical Skills</span>
          <h2 className="section-heading">What I Work With</h2>
        </Reveal>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {profile.skills.map((group) => (
            <motion.div
              key={group.category}
              variants={fadeUp}
              className="card-surface p-5"
            >
              <h3
                className="font-mono text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--color-accent)" }}
              >
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="tag-neutral">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
