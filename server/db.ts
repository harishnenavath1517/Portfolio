import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, projects, messages, InsertMessage } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── User helpers ────────────────────────────────────────────
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }

  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot get user: database not available"); return undefined; }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Project helpers ─────────────────────────────────────────
export async function getAllProjects(opts?: { featured?: boolean; category?: string }) {
  const db = await getDb();
  if (!db) return [];
  let query = db.select().from(projects);
  const rows = await query;
  let filtered = rows;
  if (opts?.featured !== undefined) {
    filtered = filtered.filter((p) => p.featured === opts.featured);
  }
  if (opts?.category) {
    filtered = filtered.filter((p) => p.category === opts.category);
  }
  return filtered.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getProjectBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// ─── Message helpers ─────────────────────────────────────────
export async function createMessage(data: InsertMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(messages).values(data);
}

// ─── Seed helpers ────────────────────────────────────────────
export async function seedProjects() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const seedData = [
    {
      title: "AI Travel Planner",
      slug: "ai-travel-planner",
      tagline: "LLM-powered itinerary generator with real-time flight and hotel data",
      description:
        "A full-stack web application that uses Claude to generate personalised travel itineraries. Users input destination, dates, and preferences; the system fetches live pricing data and produces a structured day-by-day plan with cost estimates.",
      tech: ["Python", "FastAPI", "React", "Anthropic Claude", "PostgreSQL", "Redis"],
      category: "AI" as const,
      githubUrl: "https://github.com/roorq/ai-travel-planner",
      liveUrl: null,
      featured: true,
      hasCaseStudy: true,
      caseStudyProblem:
        "Planning a trip involves juggling dozens of tabs — flights, hotels, activities, budgets. Existing tools either lock you into rigid packages or dump raw search results on you. The goal was to build a single conversational interface that synthesises all of this into an actionable plan.",
      caseStudyApproach:
        "I chose a context-stuffing approach: pull structured data from flight and hotel APIs, format it as a compact JSON blob, and inject it into the Claude system prompt alongside user preferences. This avoids the latency of RAG while keeping the context window manageable for short trips.",
      caseStudyArchitecture:
        "FastAPI backend with async endpoints. A Redis cache layer stores API responses for 15 minutes to reduce costs. The React frontend uses streaming to display the itinerary as it generates. PostgreSQL stores saved itineraries and user sessions.",
      caseStudyOutcome:
        "End-to-end itinerary generation in under 8 seconds for a 5-day trip. 40% reduction in API costs after adding the Redis cache. The project was featured in the IIT tech fest demo day.",
      displayOrder: 1,
    },
    {
      title: "BitTorrent Client",
      slug: "bittorrent-client",
      tagline: "A from-scratch BitTorrent client implementing the full BEP-3 specification",
      description:
        "A fully functional BitTorrent client written in Go, implementing tracker communication, peer discovery, piece selection, and the choking algorithm from the BEP-3 specification. Supports multi-file torrents and magnet links.",
      tech: ["Go", "TCP/IP", "Bencode", "SHA-1", "Concurrency"],
      category: "Systems" as const,
      githubUrl: "https://github.com/roorq/bittorrent-client",
      liveUrl: null,
      featured: true,
      hasCaseStudy: true,
      caseStudyProblem:
        "Understanding distributed peer-to-peer protocols at the implementation level requires building one from scratch. The BitTorrent protocol is a well-specified, battle-tested P2P system that touches concurrency, networking, and cryptographic verification.",
      caseStudyApproach:
        "Started with the BEP-3 spec and worked bottom-up: bencode parser → tracker HTTP/UDP client → peer handshake → piece download → file assembly. Each layer was tested independently before integration.",
      caseStudyArchitecture:
        "Each peer connection runs in its own goroutine. A central piece manager tracks which pieces are available and assigns work using a rarest-first strategy. The choking algorithm runs on a 10-second tick to optimise upload bandwidth.",
      caseStudyOutcome:
        "Successfully downloads real torrents at near-native speeds. The project deepened my understanding of Go concurrency patterns and the subtleties of the TCP state machine.",
      displayOrder: 2,
    },
    {
      title: "Distributed Key-Value Store",
      slug: "distributed-kv-store",
      tagline: "A Raft-based distributed key-value store with linearisable reads and writes",
      description:
        "Implemented the Raft consensus algorithm from scratch in Go to build a fault-tolerant, linearisable key-value store. Supports leader election, log replication, snapshotting, and membership changes.",
      tech: ["Go", "Raft", "gRPC", "Protobuf", "Distributed Systems"],
      category: "Systems" as const,
      githubUrl: "https://github.com/roorq/raft-kv",
      liveUrl: null,
      featured: false,
      hasCaseStudy: false,
      displayOrder: 3,
    },
    {
      title: "LLM Evaluation Harness",
      slug: "llm-eval-harness",
      tagline: "Automated evaluation framework for comparing LLM outputs across benchmarks",
      description:
        "A Python framework for running structured evaluations against language models. Supports custom benchmark datasets, multiple judge models, and produces statistical reports with confidence intervals.",
      tech: ["Python", "PyTorch", "HuggingFace", "Pandas", "Click", "JSON Schema"],
      category: "AI" as const,
      githubUrl: "https://github.com/roorq/llm-eval",
      liveUrl: null,
      featured: false,
      hasCaseStudy: false,
      displayOrder: 4,
    },
    {
      title: "Dev Environment Automation",
      slug: "dev-env-automation",
      tagline: "One-command reproducible dev environment setup using Ansible and Nix",
      description:
        "A collection of Ansible playbooks and Nix flakes that provision a fully configured development environment from a bare Ubuntu or macOS install. Includes dotfiles management, tool installation, and SSH key bootstrapping.",
      tech: ["Ansible", "Nix", "Bash", "Python", "YAML", "Linux"],
      category: "Automation" as const,
      githubUrl: "https://github.com/roorq/dotfiles",
      liveUrl: null,
      featured: false,
      hasCaseStudy: false,
      displayOrder: 5,
    },
  ];

  // Wipe and re-seed
  await db.delete(projects);
  for (const p of seedData) {
    await db.insert(projects).values(p);
  }
  console.log("[Seed] Inserted", seedData.length, "projects");
}
