// filepath /my-app/backend/src/index.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/routerMaster';
import openaiRoutes from './routes/openai';


dotenv.config(); // configures dotenv to load environment variables from a .env file

const app = express();
const port = 4000;

app.use(cors()); // setup CORS
app.use(express.json()); // parse incoming JSON request

app.use('/users', usersRouter); // route all requests to /users to the usersRouter file
app.use('/openai', openaiRoutes); // route all requests to /openai to the openaiRoutes file

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
