const blogsRouter = require('express').Router()
require('express-async-errors')
const Blog = require('../models/blog')

// blogsRouter.get('/', (request, response, next) => {
//     Blog
//         .find({})
//         .then(blogs => {
//             response.json(blogs)
//         })
//         .catch(error => next(error))
// })

blogsRouter.get('/', async (_, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

// blogsRouter.post('/', (request, response, next) => {
//     const body = request.body

//     const blog = new Blog({
//         title: body.title,
//         author: body.author,
//         url: body.url,
//         likes: body.likes
//     })

//     blog
//         .save()
//         .then(result => {
//             response.status(201).json(result)
//         })
//         .catch(error => next(error))
// })

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog({
        "title": body.title,
        "author": body.author,
        "url": body.url,
        "likes": body.likes,
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter