
import { configDotenv  } from 'dotenv';

configDotenv()

import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import authRouter from './routes/authRouter.js';
import blogRouter from './routes/blogRouter.js';
import commentRouter from './routes/commentRoute.js';

const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json());

app.use('/', authRouter)
app.use('/', blogRouter)
app.use('/', commentRouter)

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Hello! This is port ${PORT}!`)
})