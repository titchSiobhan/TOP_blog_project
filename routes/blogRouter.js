import express from 'express';
const blogRouter = express.Router();

import * as blogController from '../controllers/blogController.js'

import verifyToken from '../middleware/verify.js';

blogRouter.post('/create-post', verifyToken, blogController.createPost)

blogRouter.get('/', blogController.getPosts)

export default blogRouter