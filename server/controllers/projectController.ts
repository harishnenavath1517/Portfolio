import { Request, Response } from 'express';
import { getAllProjects, getProjectBySlug } from '../services/projectService.js';

function serializeProject(p: Awaited<ReturnType<typeof getAllProjects>>[number]) {
  return {
    id: p._id.toString(),
    title: p.title,
    slug: p.slug,
    tagline: p.tagline,
    description: p.description,
    tech: p.tech ?? [],
    category: p.category,
    githubUrl: p.githubUrl ?? null,
    liveUrl: p.liveUrl ?? null,
    featured: p.featured,
    hasCaseStudy: p.hasCaseStudy,
  };
}

export async function listProjects(req: Request, res: Response) {
  try {
    const { featured, category } = req.query;
    const opts: { featured?: boolean; category?: string } = {};
    if (featured === 'true') opts.featured = true;
    if (featured === 'false') opts.featured = false;
    if (typeof category === 'string') opts.category = category;

    const projects = await getAllProjects(opts);
    res.json(projects.map(serializeProject));
  } catch (err) {
    console.error('[Projects] list error:', err);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
}

export async function getProject(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    const project = await getProjectBySlug(slug);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({
      ...serializeProject(project as Awaited<ReturnType<typeof getAllProjects>>[number]),
      caseStudy: project.hasCaseStudy
        ? {
            problem: project.caseStudyProblem ?? '',
            approach: project.caseStudyApproach ?? '',
            architecture: project.caseStudyArchitecture ?? '',
            outcome: project.caseStudyOutcome ?? '',
          }
        : null,
    });
  } catch (err) {
    console.error('[Projects] get error:', err);
    res.status(500).json({ message: 'Failed to fetch project' });
  }
}
