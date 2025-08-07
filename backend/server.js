import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import movieRoutes from './routes/movies.routes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

//GraphQL Setup

import { ApolloServer } from 'apollo-server-express';
import typeDefs from './favorites/schema.js';
import resolvers from './favorites/resolvers.js';
import { authMiddleware } from './middlewares/auth.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const allowedOrigins = ['http://localhost:5174', 'http://localhost:5175'];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};


app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

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

// app.use('/api/favorites', favoritesRoutes);


//Apollo Server Setup
const server=new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { user: req.user };
  }
})

async function startServer() {
  await server.start();
  // We apply the 'protect' middleware to secure the GraphQL endpoint
  app.use('/graphql', authMiddleware);
  server.applyMiddleware({ app, path: '/graphql' });
}

startServer();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});