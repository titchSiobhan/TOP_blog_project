import { v4 as uuid4 } from 'uuid';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import verifyToken from '../middleware/verify.js';


async function createPost(req, res) {
    const { title, blogPost } = req.body;
    const id = uuid4()
    
   try {
   
    const post = await prisma.blogPost.create({
        data: {
            id,
            title,
            blogPost,
            author: {
            connect: { id: req.user.id }
        },
        isPublished: true

        }
    })
    console.log(post)
    res.status(201).json(post);
} catch(err) {
    console.log(err)
    res.json({
        error: 'Failed to create post'
    })
}

}

async function getPosts(req, res) {
    try {
        const posts = await prisma.blogPost.findMany({
            where: {isPublished: true}
        })
        return res.json(posts)
    } catch (err) {
        console.log(err)
        res.json({
            message: "No posts avaliable"
        })
    }
}


export {
    createPost, getPosts
}