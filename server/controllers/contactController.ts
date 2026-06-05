import { Request, Response } from 'express';
import { z } from 'zod';
import { createMessage } from '../services/contactService.js';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Invalid email address').max(320),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

export async function submitContact(req: Request, res: Response) {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.errors[0]?.message ?? 'Invalid input',
      errors: parsed.error.errors,
    });
  }

  try {
    await createMessage(parsed.data);
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('[Contact] create error:', err);
    res.status(500).json({ message: 'Failed to save message' });
  }
}
