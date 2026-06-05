import { Download, Briefcase, GraduationCap, Code2, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";
import { motion } from "motion/react";
import { staggerContainer, fadeUp } from "@/lib/animations";

export default function Resume() {
  return (
    <div style={{ backgroundColor: "var(--color-base)" }}>
      <div className="container py-20 md:py-28">
        {/* Header */}
        <Reveal className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="eyebrow block mb-3">Resume</span>
              <h1 className="section-heading">{profile.name}</h1>
              <p className="text-base mt-2" style={{ color: "var(--color-muted)" }}>
                {profile.eyebrow}
              </p>
            </div>
            <a
              href={profile.resumeUrl}
              download
              className="btn-accent self-start sm:self-auto"
              aria-label="Download Resume PDF"
            >
              <Download size={15} />
              Download PDF
            </a>
          </div>
        </Reveal>

        {/* PDF Preview hint */}
        <Reveal className="mb-12">
          <div
            className="card-surface p-4 flex items-center gap-3"
            style={{ borderColor: "rgb(110 139 255 / 0.2)" }}
          >
            <ExternalLink size={16} style={{ color: "var(--color-accent)" }} />
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              View the full PDF resume —{" "}
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors"
                style={{ color: "var(--color-accent)" }}
              >
                open in browser
              </a>
              {" "}or download above.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-14">
            {/* Experience */}
            <section>
              <Reveal>
                <div className="flex items-center gap-2 mb-6">
                  <Briefcase size={18} style={{ color: "var(--color-accent)" }} />
                  <h2 className="text-lg font-semibold" style={{ color: "var(--color-ink)" }}>
                    Experience
                  </h2>
                </div>
              </Reveal>

              <div className="space-y-6">
                {profile.experience.map((exp, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <article
                      className="card-surface p-5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                        <div>
                          <h3
                            className="font-semibold text-sm"
                            style={{ color: "var(--color-ink)" }}
                          >
                            {exp.role}
                          </h3>
                          <p
                            className="text-sm"
                            style={{ color: "var(--color-accent)" }}
                          >
                            {exp.company}
                          </p>
                        </div>
                        <span
                          className="font-mono text-xs shrink-0"
                          style={{ color: "var(--color-muted)" }}
                        >
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                        {exp.description}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <Reveal>
                <div className="flex items-center gap-2 mb-6">
                  <GraduationCap size={18} style={{ color: "var(--color-accent)" }} />
                  <h2 className="text-lg font-semibold" style={{ color: "var(--color-ink)" }}>
                    Education
                  </h2>
                </div>
              </Reveal>

              {profile.education.map((edu, i) => (
                <Reveal key={i} delay={0.1}>
                  <article className="card-surface p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                      <div>
                        <h3
                          className="font-semibold text-sm"
                          style={{ color: "var(--color-ink)" }}
                        >
                          {edu.degree}
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: "var(--color-accent)" }}
                        >
                          {edu.institution}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span
                          className="font-mono text-xs block"
                          style={{ color: "var(--color-muted)" }}
                        >
                          {edu.period}
                        </span>
                        <span
                          className="font-mono text-xs"
                          style={{ color: "var(--color-ink)" }}
                        >
                          GPA: {edu.gpa}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {edu.highlights.map((h) => (
                        <span key={h} className="tag-neutral">
                          {h}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </section>
          </div>

          {/* Skills sidebar */}
          <aside>
            <Reveal>
              <div className="flex items-center gap-2 mb-6">
                <Code2 size={18} style={{ color: "var(--color-accent)" }} />
                <h2 className="text-lg font-semibold" style={{ color: "var(--color-ink)" }}>
                  Skills
                </h2>
              </div>
            </Reveal>

            <motion.div
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {profile.skills.map((group) => (
                <motion.div
                  key={group.category}
                  variants={fadeUp}
                  className="card-surface p-4"
                >
                  <h3
                    className="font-mono text-xs font-semibold uppercase tracking-widest mb-3"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span key={item} className="tag-neutral">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}
