import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import movieRoutes from './routes/movies.routes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Database
connectDB();

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// Admin test route
app.post('/api/admin/test', (req, res) => {
  res.json({ message: 'Admin endpoint working' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});