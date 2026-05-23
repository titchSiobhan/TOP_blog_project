import { v4 as uuid4 } from 'uuid';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import { connect } from 'node:http2';

async function createPost(req, res) {
	const { title, blogPost } = req.body;
	const id = uuid4();

	try {
		const post = await prisma.blogPost.create({
			data: {
				id,
				title,
				blogPost,
				author: {
					connect: { id: req.user.id },
				},
			},
		});
		console.log(post);
		res.status(201).json(post);
	} catch (err) {
		console.log(err);
		res.json({
			error: 'Failed to create post',
		});
	}
}

async function getPosts(req, res) {
	try {
		const posts = await prisma.blogPost.findMany({
			where: { isPublished: true },
			include: {
				author: {
					select: {
						username: true,
					},
				},
			},
		});
		return res.json(posts);
	} catch (err) {
		console.log(err);
		res.json([]);
	}
}

async function getAllUserPost(req, res) {
	try {
		const posts = await prisma.blogPost.findMany({
			where: {
				authorId: req.user.id,
			},
		});
		
		return	res.json(posts);
		
	} catch (err) {
		console.log(err);
		res.json([]);
	}
}

async function editPost(req, res) {
	const { title, blogPost } = req.body;
	const { postId } = req.params;

	try {
		const post = await prisma.blogPost.update({
			where: {
				id: postId,
			},
			data: {
				title,
				blogPost,
			},
		});
		if (!post) {
			return res.status(403).json({ error: 'not allowed' });
		}
		if (post.authorId !== req.user.id) {
			return res.status(403).json({ error: "You're not the author!" });
		}
		return res.json(post);
	} catch (err) {
		console.log(err);
		return res.json({
			message: 'Unable to edit post',
		});
	}
}

async function publishPost(req, res) {
	const { postId } = req.params;

	try {
		const post = await prisma.blogPost.update({
			where: {
				id: postId,
			},
			data: {
				isPublished: true,
			},
		});
		if (!post) {
			return res.status(403).json({ error: 'not allowed' });
		}
		if (post.authorId !== req.user.id) {
			return res.status(403).json({ error: "You're not the author!" });
		}
		return res.json(post);
	} catch (err) {
		console.log(err);
		return res.json({
			message: 'Unable to publish post',
		});
	}
}

async function draftPost(req, res) {
	const { postId } = req.params;

	try {
		const post = await prisma.blogPost.update({
			where: {
				id: postId,
			},
			data: {
				isPublished: false,
			},
		});
		if (!post) {
			return res.status(403).json({ error: 'not allowed' });
		}
		if (post.authorId !== req.user.id) {
			return res.status(403).json({ error: "You're not the author!" });
		}
		return res.json(post);
	} catch (err) {
		console.log(err);
		return res.json({
			message: 'Unable to unpublish post',
		});
	}
}

async function deletePost(req, res) {
	const { postId } = req.params;

	try {
		const post = await prisma.blogPost.delete({
			where: {
				id: postId,
			},
		});
		if (!post) {
			return res.status(403).json({ error: 'not allowed' });
		}
		if (post.authorId !== req.user.id) {
			return res.status(403).json({ error: "You're not the author!" });
		}
		return res.json({
			message: 'Post Deleted',
		});
	} catch (err) {
		console.log(err);
		return res.json({
			message: 'Unable to delete post',
		});
	}
}

async function getSinglePost(req, res) {
	const { postId } = req.params;
	try {
		const post = await prisma.blogPost.findUnique({
			where: { id: postId },
			include: {
				author: true,
				comments: {
					include: {
						author: true,
					},
				},
			},
		});
		return res.json({ post: post || null})

		
		
	} catch (err) {
		console.log(err);
		return res.json({
			post: null
		});
	}
}

export {
	createPost,
	getPosts,
	getAllUserPost,
	editPost,
	publishPost,
	draftPost,
	deletePost,
	getSinglePost,
};
