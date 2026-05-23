import express from 'express';
const authRouter = express.Router();

import * as authController from '../controllers/authController.js';
import verifyToken from '../middleware/verify.js';
import prisma from '../lib/prisma.js';

authRouter.post('/sign-up', authController.signUp);

authRouter.post('/login', authController.login)

authRouter.get('/me', verifyToken, async (req, res) => {
  
   try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        username: true,
        userEmail: true
      }
    });
    console.log('Decoded user: ', req.user)
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to load user" });
  }
});





export default authRouter