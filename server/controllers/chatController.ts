import { Request, Response } from 'express';
import { z } from 'zod';
import { sendChatMessage } from '../services/chatService.js';
import { buildPortfolioContext, profile } from '../profile.js';

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().min(1).max(4000),
      })
    )
    .min(1)
    .max(40),
});

export async function chat(req: Request, res: Response) {
  const parsed = chatSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: parsed.error.errors[0]?.message ?? 'Invalid input',
    });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(503).json({ message: 'AI assistant is not configured.' });
  }

  try {
    const portfolioContext = buildPortfolioContext();
    const reply = await sendChatMessage(
      parsed.data.messages,
      portfolioContext,
      profile.name,
      profile.handle,
    );
    res.json({ reply });
  } catch (err) {
    console.error('[Chat] error:', err);
    res.status(500).json({ message: 'AI assistant is temporarily unavailable.' });
  }
}
