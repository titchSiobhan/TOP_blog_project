import express from 'express';
const blogRouter = express.Router();

import * as blogController from '../controllers/blogController.js'

import verifyToken from '../middleware/verify.js';

blogRouter.get('/home', blogController.getPosts);
blogRouter.post('/create-post', verifyToken, blogController.createPost)

blogRouter.get('/post/:postId', blogController.getSinglePost)

blogRouter.get('/posts', verifyToken, blogController.getAllUserPost)

blogRouter.put('/post/:postId/edit', verifyToken, blogController.editPost)

blogRouter.put('/post/:postId/publish', verifyToken, blogController.publishPost);
blogRouter.put('/post/:postId/draft', verifyToken, blogController.draftPost);
blogRouter.delete('/post/:postId/delete', verifyToken, blogController.deletePost)

export default blogRouter