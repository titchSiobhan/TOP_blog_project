
import { configDotenv  } from 'dotenv';

configDotenv()

import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import cors from "cors";
import authRouter from './routes/authRouter.js';
import blogRouter from './routes/blogRouter.js';
import commentRouter from './routes/commentRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173",
    'https://mini-press.netlify.app/'
  ]
}));



app.use('/api', authRouter)
app.use('/api', blogRouter)
app.use('/api', commentRouter)

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Hello! This is port ${PORT}!`)
})