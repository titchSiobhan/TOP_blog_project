import express from 'express';
const commentRouter = express.Router();

import * as commentController from '../controllers/commentController.js'

import verifyToken from '../middleware/verify.js';

commentRouter.post('/comment/:postId/add-comment', verifyToken, commentController.addComment);

commentRouter.put('/comment/:postId/:commentId/edit', verifyToken, commentController.editComment)

commentRouter.delete('/comment/:postId/:commentId/delete', verifyToken, commentController.deleteComment)

commentRouter.get('/comment/:postId', commentController.getComments)


export default commentRouter