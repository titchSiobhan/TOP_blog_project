import express from 'express';
const commentRouter = express.Router();

import * as commentController from '../controllers/commentController.js'

import verifyToken from '../middleware/verify.js';

commentRouter.post('/:postId/add-comment', verifyToken, commentController.addComment);

commentRouter.put('/edit/:postId/:commentId', verifyToken, commentController.editComment)

commentRouter.delete('/delete/:postId/:commentId', verifyToken, commentController.deleteComment)

commentRouter.get('/:postId', commentController.getComments)


export default commentRouter