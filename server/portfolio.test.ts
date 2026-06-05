import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ─── Mock DB helpers ──────────────────────────────────────────
vi.mock("./db", () => ({
  getAllProjects: vi.fn(async () => [
    {
      id: 1,
      title: "AI Travel Planner",
      slug: "ai-travel-planner",
      tagline: "LLM-powered itinerary generator",
      description: "A full-stack web app",
      tech: ["Python", "FastAPI"],
      category: "AI",
      githubUrl: "https://github.com/roorq/ai-travel-planner",
      liveUrl: null,
      featured: true,
      hasCaseStudy: true,
      displayOrder: 1,
    },
    {
      id: 2,
      title: "BitTorrent Client",
      slug: "bittorrent-client",
      tagline: "BEP-3 implementation",
      description: "A fully functional BitTorrent client",
      tech: ["Go", "TCP/IP"],
      category: "Systems",
      githubUrl: "https://github.com/roorq/bittorrent-client",
      liveUrl: null,
      featured: true,
      hasCaseStudy: true,
      displayOrder: 2,
    },
  ]),
  getProjectBySlug: vi.fn(async (slug: string) => {
    if (slug === "ai-travel-planner") {
      return {
        id: 1,
        title: "AI Travel Planner",
        slug: "ai-travel-planner",
        tagline: "LLM-powered itinerary generator",
        description: "A full-stack web app",
        tech: ["Python", "FastAPI"],
        category: "AI",
        githubUrl: "https://github.com/roorq/ai-travel-planner",
        liveUrl: null,
        featured: true,
        hasCaseStudy: true,
        caseStudyProblem: "Planning a trip is hard",
        caseStudyApproach: "Context stuffing",
        caseStudyArchitecture: "FastAPI + Redis",
        caseStudyOutcome: "8s generation",
        displayOrder: 1,
      };
    }
    return null;
  }),
  createMessage: vi.fn(async () => {}),
}));

// ─── Mock LLM ────────────────────────────────────────────────
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn(async () => ({
    choices: [{ message: { content: "Roorq has built 5 projects." } }],
  })),
}));

// ─── Mock notification ───────────────────────────────────────
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(async () => true),
}));

// ─── Helper ──────────────────────────────────────────────────
function makeCtx(ip = "127.0.0.1"): TrpcContext {
  return {
    user: null,
    req: {
      headers: { "x-forwarded-for": ip },
      protocol: "https",
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

// ─── Tests ───────────────────────────────────────────────────
describe("projects.list", () => {
  it("returns all projects", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.projects.list({});
    expect(result).toHaveLength(2);
    expect(result[0]?.title).toBe("AI Travel Planner");
  });

  it("returns project fields correctly", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.projects.list({});
    const project = result[0];
    expect(project).toMatchObject({
      slug: "ai-travel-planner",
      category: "AI",
      featured: true,
      hasCaseStudy: true,
    });
  });
});

describe("projects.bySlug", () => {
  it("returns a project with case study", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.projects.bySlug({ slug: "ai-travel-planner" });
    expect(result.title).toBe("AI Travel Planner");
    expect(result.caseStudy).not.toBeNull();
    expect(result.caseStudy?.problem).toBe("Planning a trip is hard");
  });

  it("throws NOT_FOUND for unknown slug", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(caller.projects.bySlug({ slug: "nonexistent" })).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
  });
});

describe("contact.submit", () => {
  it("accepts valid contact form submission", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.contact.submit({
      name: "Alice",
      email: "alice@example.com",
      message: "Hello, I would like to connect!",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short messages", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(
      caller.contact.submit({
        name: "Bob",
        email: "bob@example.com",
        message: "Hi",
      })
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("rejects invalid email", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(
      caller.contact.submit({
        name: "Charlie",
        email: "not-an-email",
        message: "This is a valid message length",
      })
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});

describe("chat.send", () => {
  it("returns a reply from the LLM", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.chat.send({
      messages: [{ role: "user", content: "What projects has Roorq built?" }],
    });
    expect(result.reply).toBe("Roorq has built 5 projects.");
  });

  it("rejects empty message array", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(
      caller.chat.send({ messages: [] })
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});

describe("auth.logout", () => {
  it("clears session cookie and returns success", async () => {
    const ctx = makeCtx();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result.success).toBe(true);
  });
});
