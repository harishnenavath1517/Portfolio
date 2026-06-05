import { useState } from "react";
import { Github, Linkedin, Mail, Twitter, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";
import { submitContact } from "@/lib/api";
import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email address";
    if (!form.message.trim()) errs.message = "Message is required";
    else if (form.message.trim().length < 10) errs.message = "Message must be at least 10 characters";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setApiError(null);
    setIsLoading(true);
    try {
      await submitContact(form);
      setIsSuccess(true);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <div style={{ backgroundColor: "var(--color-base)" }}>
      <div className="container py-20 md:py-28">
        {/* Header */}
        <Reveal className="mb-16">
          <span className="eyebrow block mb-3">Contact</span>
          <h1 className="section-heading mb-4">Get in Touch</h1>
          <p className="text-base max-w-lg" style={{ color: "var(--color-muted)" }}>
            I'm open to internship and full-time opportunities, collaborations, or just a good conversation about systems and AI.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
          {/* Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            {isSuccess ? (
              <div
                className="card-surface p-8 flex flex-col items-center text-center gap-4"
                style={{ borderColor: "rgb(74 222 128 / 0.3)" }}
              >
                <CheckCircle size={40} style={{ color: "var(--color-success)" }} />
                <h2 className="text-lg font-semibold" style={{ color: "var(--color-ink)" }}>
                  Message Sent!
                </h2>
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  className="btn-ghost text-sm mt-2"
                  onClick={() => {
                    setIsSuccess(false);
                    setForm({ name: "", email: "", message: "" });
                  }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--color-ink)" }}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: errors.name ? "var(--color-error)" : "var(--color-line)",
                      color: "var(--color-ink)",
                    }}
                    onFocus={(e) => {
                      if (!errors.name) {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.name) {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-line)";
                      }
                    }}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-xs" style={{ color: "var(--color-error)" }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--color-ink)" }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: errors.email ? "var(--color-error)" : "var(--color-line)",
                      color: "var(--color-ink)",
                    }}
                    onFocus={(e) => {
                      if (!errors.email) {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.email) {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-line)";
                      }
                    }}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs" style={{ color: "var(--color-error)" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--color-ink)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    rows={5}
                    className="w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors resize-none"
                    style={{
                      backgroundColor: "var(--color-surface)",
                      borderColor: errors.message ? "var(--color-error)" : "var(--color-line)",
                      color: "var(--color-ink)",
                    }}
                    onFocus={(e) => {
                      if (!errors.message) {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.message) {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-line)";
                      }
                    }}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-xs" style={{ color: "var(--color-error)" }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* API error */}
                {apiError && (
                  <div
                    className="flex items-center gap-2 p-3 rounded-md border text-sm"
                    style={{
                      borderColor: "rgb(248 113 113 / 0.3)",
                      backgroundColor: "rgb(248 113 113 / 0.05)",
                      color: "var(--color-error)",
                    }}
                  >
                    <AlertCircle size={15} />
                    {apiError}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-accent w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Social links */}
          <Reveal delay={0.15}>
            <div className="space-y-6">
              <div>
                <h2
                  className="font-mono text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "var(--color-accent)" }}
                >
                  Find Me Online
                </h2>
                <div className="space-y-3">
                  {profile.socials.map((social) => {
                    const Icon = ICON_MAP[social.icon];
                    if (!Icon) return null;
                    return (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-md border transition-colors group"
                        style={{
                          borderColor: "var(--color-line)",
                          backgroundColor: "var(--color-surface)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "rgb(110 139 255 / 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--color-line)";
                        }}
                      >
                        <Icon size={16} />
                        <span className="text-sm font-medium" style={{ color: "var(--color-ink)" }}>
                          {social.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div
                className="card-surface p-5"
                style={{ borderColor: "rgb(110 139 255 / 0.15)" }}
              >
                <h3
                  className="font-mono text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "var(--color-accent)" }}
                >
                  Response Time
                </h3>
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  I typically respond within 24–48 hours. For urgent matters, email is the fastest channel.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
