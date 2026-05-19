import express from 'express';
const authRouter = express.Router();

import * as authController from '../controllers/authController.js';
import verifyToken from '../middleware/verify.js';

authRouter.post('/sign-up', authController.signUp);

authRouter.post('/login', authController.login)


export default authRouter