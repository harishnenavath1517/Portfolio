import { Project } from '../models/Project.js';

export async function getAllProjects(opts?: { featured?: boolean; category?: string }) {
  const filter: Record<string, unknown> = {};
  if (opts?.featured !== undefined) filter.featured = opts.featured;
  if (opts?.category) filter.category = opts.category;
  return Project.find(filter).sort({ displayOrder: 1 }).lean();
}

export async function getProjectBySlug(slug: string) {
  return Project.findOne({ slug }).lean();
}
