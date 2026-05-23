import { v4 as uuid4 } from 'uuid';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

async function addComment(req, res) {
    const { postId } = req.params;
    const id = uuid4();
    const { comment } = req.body;

    try{
    const comments = await prisma.comments.create({
        data: {
            id,
            comment,
            author: {
					connect: { id: req.user.id },
				},
            blogPost: {
                connect: {id: postId}
            }
        }
    })
     return res.json(comments)
} catch (err) {
    console.log(err);
    return res.json({err})
}
}

async function editComment(req, res) {
    
const { postId, commentId } = req.params;
const {comment} = req.body

    try {
        const comments = await prisma.comments.update({
            where: {
                id: commentId
            },
            data: {
                comment
            }
        })
        if (!comments) {
            return res.json([])
        }
        if (comments.authorId !== req.user.id) {
            return res.status(403).json({error:"You're not the author!"})
        }
        return res.json(comments)
    } catch (err) {
        console.log(err);
        return res.json("Can't edit post")
    }
}

async function deleteComment(req, res) {
    const { commentId } = req.params;

    try {
        const comment = await prisma.comments.delete({
            where: {
                id: commentId
            },
            
        })
        if (!comment ) {
            return res.status(403).json({error:"not allowed"})
        }
         if (comment.authorId !== req.user.id) {
            return res.status(403).json({error:"You're not the author!"})
        }
        return res.json({
            message: "Comment Deleted"
        })

    } catch (err) {
        console.log(err)
        return res.json({
            message: 'Unable to delete comment'
        })
    }

}

async function getComments(req, res) {
    const postId = req.params
    try {
        const comments = await prisma.comments.findMany({ 
            where: {
                BlogPost: postId
            }
        });

        if (comments === 0 ) {
            return res.json({message: "No comments yet!"})
        }
        res.status(201).json(comments)
    } catch (err) {
        console.log(err);
		res.json([]);
    }
}



export {
    addComment, editComment, deleteComment, getComments
}