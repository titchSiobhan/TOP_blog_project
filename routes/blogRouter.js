import express from 'express';
const blogRouter = express.Router();

import * as blogController from '../controllers/blogController.js'

import verifyToken from '../middleware/verify.js';

blogRouter.get('/', blogController.getPosts);
blogRouter.post('/create-post', verifyToken, blogController.createPost)

blogRouter.get('/post/:postId', blogController.getSinglePost)

blogRouter.get('/posts', verifyToken, blogController.getAllUserPost)

blogRouter.put('/:postId/edit', verifyToken, blogController.editPost)

blogRouter.put('/:postId/publish', verifyToken, blogController.publishPost);
blogRouter.put('/:postId/draft', verifyToken, blogController.draftPost);
blogRouter.delete('/:postId/delete', verifyToken, blogController.deletePost)

export default blogRouter