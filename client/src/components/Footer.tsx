import { Github, Linkedin, Mail, Twitter, Code2 } from "lucide-react";
import { profile } from "@/data/profile";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t mt-24"
      style={{
        borderColor: "var(--color-line)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Code2 size={16} style={{ color: "var(--color-accent)" }} />
          <span
            className="font-mono text-sm font-semibold"
            style={{ color: "var(--color-ink)" }}
          >
            roorq.dev
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs" style={{ color: "var(--color-muted)" }}>
          © {year} {profile.name}. Built with React + Express.
        </p>

        {/* Social links */}
        <div className="flex items-center gap-3">
          {profile.socials.map((social) => {
            const Icon = ICON_MAP[social.icon];
            if (!Icon) return null;
            return (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 rounded-md transition-colors duration-150"
                style={{ color: "var(--color-muted)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--color-ink)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--color-muted)";
                }}
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
