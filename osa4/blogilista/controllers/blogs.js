const blogsRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
	blogs = await Blog.find({}).populate('user', { username: 1, name:1, id:1})
	response.json(blogs)
})

blogsRouter.post('/', 
	middleware.userExtractor, 
	async (request, response, next) => {
	const body = request.body
	const user = request.user
	const blog = new Blog ({
		title : body.title,
		author : body.author,
		url : body.url,
		likes : body.likes,
		user: user._id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id',
	middleware.tokenExtractor,
	middleware.userExtractor, 
	async (request, response, next) => {
	const blogToRemove = await Blog.findById(request.params.id)
	const user = request.user
	if ( blogToRemove.user.toString() === user.id.toString() ) {
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	} else {
		response.status(401).json({error: 'wrong or invalid credentials'})
	}
})

blogsRouter.put('/:id', async (request, response, next) => {
	const body = request.body 

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true })
	response.json(updated)
})




module.exports = blogsRouter

