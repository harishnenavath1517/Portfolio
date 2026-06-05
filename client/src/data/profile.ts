// Client-side profile data — single source of truth for all UI.
export const profile = {
  name: "Harish Nenavath",
  handle: "HarishNenavath",
  eyebrow: "Final-year CSE @ IIT Roorkee",
  headline: "Full-Stack Developer & Builder — I build web products, AI systems, and low-level software.",
  summary:
    "I'm a final-year Computer Science student at IIT Roorkee who builds across the stack — from React frontends and Node backends to ML models and low-level systems software. I care most about shipping things that actually work, not just demos.",
  focusTags: ["Full-Stack", "Backend", "Web Development", "AI/ML", "Systems"],
  location: "India",
  email: "nenavath_h@cs.iitr.ac.in",
  resumeUrl: "/resume.pdf",

  bio: [
    "I'm a final-year Computer Science student at IIT Roorkee who builds across the stack — from React frontends and Node backends to ML models and low-level systems software. I care most about shipping things that actually work, not just demos.",
    "Right now I'm working as Founding Engineer at Roorq, a curated vintage marketplace incubated at IIT Roorkee's TIDES Business Incubator, where I own engineering end-to-end in TypeScript, React, and Node. Before this I interned as a Web Development Intern at Nutrihub building production web apps, and at Diginique TechLabs building applications in C++ and Java.",
    "My work spans full-stack web development, AI/ML (including a Transformer-enhanced deep-RL model for mobile-edge offloading), and systems projects like a RISC-V assembler and a BitTorrent-based P2P file transfer system. I'm looking for remote software engineering roles and paid internships where I can build real products.",
  ],

  skills: [
    { category: "Languages", items: ["C++", "Python", "Java", "JavaScript", "TypeScript", "SQL"] },
    { category: "Frontend", items: ["React.js", "HTML", "CSS"] },
    { category: "Backend", items: ["Node.js", "Express.js", "Flask", "Django", "REST APIs"] },
    { category: "Databases", items: ["MongoDB", "MySQL", "Firebase"] },
    { category: "AI / ML", items: ["TensorFlow", "PyTorch", "scikit-learn", "NumPy", "pandas", "Matplotlib"] },
    { category: "Systems & CS", items: ["Data Structures", "Algorithms", "OOP", "Operating Systems", "Computer Networks", "Computer Architecture"] },
    { category: "Tools", items: ["Git", "GitHub", "VS Code"] },
  ],

  experience: [
    {
      role: "Founding Engineer",
      company: "Roorq",
      period: "2025 – Present",
      description:
        "Building a TIDES-incubated curated vintage marketplace end-to-end — React/TypeScript frontend, Node.js backend, REST APIs — owning all engineering decisions from scratch toward MVP launch.",
    },
    {
      role: "Web Development Intern",
      company: "Nutrihub",
      period: "May 2025 – Jun 2025",
      description:
        "Built and maintained production-grade web applications with robust backend API integration. Optimized data flow and client–server communication to improve performance and responsiveness.",
    },
    {
      role: "Summer Intern",
      company: "Diginique TechLabs",
      period: "Jun 2024 – Aug 2024",
      description:
        "Built multiple applications in C++ and Java with a strong focus on data structures, algorithmic efficiency, and clean code. Developed an AI-based Tic-Tac-Toe engine and a constraint-driven Sudoku solver.",
    },
  ],

  education: [
    {
      degree: "B.Tech, Computer Science & Engineering",
      institution: "IIT Roorkee",
      period: "2022 – 2026",
      gpa: "6.908 / 10",
      highlights: ["TIDES Business Incubator — Roorq", "Google Data Analytics Professional Certificate"],
    },
  ],

  socials: [
    { label: "GitHub", url: "https://github.com/HarishNenavath", icon: "github" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/harishnenavath", icon: "linkedin" },
    { label: "Email", url: "mailto:nenavath_h@cs.iitr.ac.in", icon: "mail" },
  ],
};
