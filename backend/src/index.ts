import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import syncRoutes from './routes/sync';
import authRoutes from './routes/auth';
import dataRoutes from './routes/data';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Attach IO to req for access in routes
app.use((req: any, res, next) => {
    req.io = io;
    next();
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api', syncRoutes);
app.use('/api', dataRoutes);
app.use('/api/auth', authRoutes);

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('disconnect', () => console.log('Client disconnected'));
});

httpServer.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
