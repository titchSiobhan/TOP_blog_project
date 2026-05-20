import express from 'express';
const blogRouter = express.Router();

import * as blogController from '../controllers/blogController.js'

import verifyToken from '../middleware/verify.js';


blogRouter.post('/create-post', verifyToken, blogController.createPost)

blogRouter.get('/', blogController.getPosts);

blogRouter.get('/posts', verifyToken, blogController.getAllUserPost)

blogRouter.put('/edit/:postId', verifyToken, blogController.editPost)

blogRouter.put('/publish/:postId', verifyToken, blogController.publishPost);
blogRouter.put('/draft/:postId', verifyToken, blogController.draftPost);
blogRouter.delete('/delete/:postId', verifyToken, blogController.deletePost)

export default blogRouter