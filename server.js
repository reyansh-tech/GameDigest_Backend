import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import cricketRouter from './routes/cricket.js';
import footballRouter from './routes/football.js';
import basketballRouter from './routes/basketball.js';
import f1Router from './routes/f1.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 8080);
const frontendOrigin = process.env.FRONTEND_ORIGIN || "*";

app.use(cors({
  origin: "*"
}));

app.use(express.json());

// Health check
app.get('/', (_req, res) => {
  res.send("GameDigest backend running 🚀");
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'gamedigest-proxy' });
});

// API routes
app.use('/api/cricket', cricketRouter);
app.use('/api/football', footballRouter);
app.use('/api/basketball', basketballRouter);
app.use('/api/f1', f1Router);

// Error handler
app.use((err, _req, res, _next) => {
  console.error('[Server]', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`GameDigest backend running on port ${PORT}`);
});
