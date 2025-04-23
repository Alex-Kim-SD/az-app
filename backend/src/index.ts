import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users';

dotenv.config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// ✅ This line mounts the users route at /users
app.use('/users', usersRouter);

app.get('/', (_req, res) => {
  res.send('API is live!');
});

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
