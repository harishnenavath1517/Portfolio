const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? '';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({})) as { message?: string };
    throw new Error(body.message ?? `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  tech: string[];
  category: string;
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  hasCaseStudy: boolean;
  caseStudy?: {
    problem: string;
    approach: string;
    architecture: string;
    outcome: string;
  } | null;
}

export function fetchProjects(opts?: { featured?: boolean; category?: string }) {
  const params = new URLSearchParams();
  if (opts?.featured !== undefined) params.set('featured', String(opts.featured));
  if (opts?.category) params.set('category', opts.category);
  const qs = params.toString() ? `?${params}` : '';
  return request<Project[]>(`/api/projects${qs}`);
}

export function fetchProject(slug: string) {
  return request<Project>(`/api/projects/${encodeURIComponent(slug)}`);
}

export function submitContact(data: { name: string; email: string; message: string }) {
  return request<{ success: boolean }>('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export function sendChatMessage(messages: Array<{ role: 'user' | 'assistant'; content: string }>) {
  return request<{ reply: string }>('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
}
