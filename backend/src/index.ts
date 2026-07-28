import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import subscriptionRoutes from './routes/subscriptions.js';
import truckRoutes from './routes/trucks.js';
import wasteRoutes from './routes/waste.js';
import notificationRoutes from './routes/notifications.js';
import { authenticate } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://bright-solutions-seven.vercel.app',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/auth', authRoutes);
app.use('/users', authenticate, userRoutes);
app.use('/subscriptions', authenticate, subscriptionRoutes);
app.use('/trucks', authenticate, truckRoutes);
app.use('/waste', authenticate, wasteRoutes);
app.use('/notifications', authenticate, notificationRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message: Buffer) => {
    try {
      const data = JSON.parse(message.toString());
      if (data.type === 'truck-location') {
        wss.clients.forEach((client) => {
          if (client.readyState === 1) { // 1 = OPEN
            client.send(JSON.stringify(data));
          }
        });
      }
    } catch (e) {
      console.error('Error handling WebSocket message:', e);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

export default app;
