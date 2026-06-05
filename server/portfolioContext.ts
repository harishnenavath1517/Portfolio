// ─── Server-side Portfolio Context ────────────────────────────
// Single source of truth: re-exports the shared profile data
// and provides a buildPortfolioContext() helper for the AI chatbot.
//
// The profile data lives in shared/profile.ts and is imported by
// both the client (client/src/data/profile.ts re-exports it) and
// the server here. This ensures the chatbot corpus is always in
// sync with the displayed content.

export const profile = {
  name: "Roorq",
  handle: "roorq.dev",
  eyebrow: "Final-year IIT CSE Student",
  headline: "Building at the intersection of AI, Backend & Systems",
  summary:
    "I'm a final-year Computer Science student at IIT with a deep interest in AI systems, backend engineering, distributed computing, and automation. I build things that are fast, reliable, and thoughtfully designed.",
  focusTags: ["AI", "Backend", "Systems", "Full Stack", "Automation"],
  location: "India",
  email: "roorq@example.com",
  resumeUrl: "/resume.pdf",

  bio: [
    "I'm a final-year B.Tech student in Computer Science & Engineering at IIT. My academic journey has been defined by a relentless curiosity about how systems work at scale — from the networking layer all the way up to intelligent applications.",
    "My technical focus spans AI/ML engineering, backend systems, distributed computing, and automation. I'm particularly excited about building systems that are not just functional but genuinely robust — systems that handle edge cases gracefully, scale without drama, and are maintainable by teams.",
    "Outside of coursework and projects, I contribute to open-source tooling, participate in competitive programming, and explore the intersection of LLMs with practical software engineering. I believe the most interesting problems live at the boundary between disciplines.",
    "I'm actively looking for full-time roles and internships in backend engineering, AI/ML infrastructure, or systems programming. If you're building something ambitious, I'd love to talk.",
  ],

  skills: [
    {
      category: "Languages",
      items: ["Python", "Go", "C++", "JavaScript", "TypeScript", "Rust (learning)", "SQL"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "gRPC", "REST APIs"],
    },
    {
      category: "AI / ML",
      items: ["PyTorch", "Transformers (HuggingFace)", "LangChain", "Anthropic Claude API", "OpenAI API", "Scikit-learn", "FAISS"],
    },
    {
      category: "Systems & Networking",
      items: ["TCP/IP", "BitTorrent Protocol", "Linux", "Docker", "Kubernetes (basics)", "POSIX", "Socket Programming"],
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "GitHub Actions", "Vercel", "Render", "AWS (S3, EC2)", "Postman", "Vim", "VS Code"],
    },
  ],

  experience: [
    {
      role: "Software Engineering Intern",
      company: "TechCorp (Placeholder)",
      period: "May 2024 – Aug 2024",
      description:
        "Built and deployed a real-time data pipeline processing 50k+ events/day using Kafka and Python. Reduced latency by 40% through query optimisation and caching strategies.",
    },
    {
      role: "Research Assistant — AI Lab",
      company: "IIT (Placeholder)",
      period: "Jan 2024 – May 2024",
      description:
        "Assisted in fine-tuning transformer models for code generation tasks. Implemented evaluation harnesses and contributed to a paper on efficient inference.",
    },
  ],

  education: [
    {
      degree: "B.Tech, Computer Science & Engineering",
      institution: "Indian Institute of Technology (Placeholder)",
      period: "2021 – 2025",
      gpa: "9.2 / 10",
      highlights: ["Dean's List", "Best Project Award — Systems Course", "ACM Student Chapter Lead"],
    },
  ],

  socials: [
    { label: "GitHub", url: "https://github.com/roorq", icon: "github" },
    { label: "LinkedIn", url: "https://linkedin.com/in/roorq", icon: "linkedin" },
    { label: "Email", url: "mailto:roorq@example.com", icon: "mail" },
    { label: "Twitter", url: "https://twitter.com/roorq", icon: "twitter" },
  ],
};

// ─── Build LLM context string from profile ────────────────────
export function buildPortfolioContext(): string {
  const skillsList = profile.skills
    .map((g) => `${g.category}: ${g.items.join(", ")}`)
    .join("\n");

  const experienceList = profile.experience
    .map((e) => `- ${e.role} at ${e.company} (${e.period}): ${e.description}`)
    .join("\n");

  const educationList = profile.education
    .map((e) => `- ${e.degree} at ${e.institution} (${e.period}), GPA: ${e.gpa}. Highlights: ${e.highlights.join(", ")}`)
    .join("\n");

  return `
ABOUT ${profile.name.toUpperCase()} (${profile.handle})
${profile.eyebrow}
${profile.headline}

SUMMARY:
${profile.summary}

BIO:
${profile.bio.join("\n\n")}

SKILLS:
${skillsList}

EXPERIENCE:
${experienceList}

EDUCATION:
${educationList}

CONTACT:
- Email: ${profile.email}
- GitHub: https://github.com/roorq
- LinkedIn: https://linkedin.com/in/roorq
- Twitter: https://twitter.com/roorq

STATUS: Open to full-time roles and internships in backend engineering, AI/ML infrastructure, and systems programming.
`.trim();
}
