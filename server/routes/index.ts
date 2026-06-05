import { Router, Application } from 'express';
import rateLimit from 'express-rate-limit';
import { listProjects, getProject } from '../controllers/projectController.js';
import { submitContact } from '../controllers/contactController.js';
import { chat } from '../controllers/chatController.js';

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Too many submissions. Please wait before trying again.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const chatLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: { message: "You're sending messages too quickly. Please wait a moment." },
  standardHeaders: true,
  legacyHeaders: false,
});

export function registerRoutes(app: Application) {
  const api = Router();

  // Health check
  api.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: Date.now() });
  });

  // Projects
  api.get('/projects', listProjects);
  api.get('/projects/:slug', getProject);

  // Contact
  api.post('/contact', contactLimiter, submitContact);

  // Chat
  api.post('/chat', chatLimiter, chat);

  app.use('/api', api);
}
