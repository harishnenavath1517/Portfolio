import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { registerRoutes } from './routes/index.js';

const app = express();
const PORT = parseInt(process.env.PORT ?? '5000', 10);

// Security: Helmet
app.use(helmet());
console.log('[Security] Helmet applied');

// CORS: restricted to CLIENT_ORIGIN
const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173';
app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
);
console.log(`[CORS] Allowing origin: ${clientOrigin}`);

// Body parsing with tight size limits
app.use('/api/contact', express.json({ limit: '64kb' }));
app.use('/api/chat', express.json({ limit: '128kb' }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// API routes
registerRoutes(app);

// MongoDB
const MONGODB_URI = process.env.MONGODB_URI ?? '';
if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('[DB] MongoDB connected'))
    .catch((err) => console.error('[DB] Connection error:', err));
} else {
  console.warn('[DB] MONGODB_URI not set — database unavailable (set it in .env)');
}

app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
});
