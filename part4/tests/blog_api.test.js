const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(helper.initialUser.password, saltRounds)

    const user = new User({
        'username': helper.initialUser.username,
        'name': helper.initialUser.name,
        passwordHash,
    })
    const savedUser = await user.save()

    const blogObjects = helper.initialBlogs.map(blog =>
        new Blog({ ...blog, 'user': savedUser._id })
    )

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
})

test('length of the blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('check blog Schema have id attribute or not', async () => {
    const response = await api.get('/api/blogs')
    const result = response.body.map(r => r.id)

    expect(result[0]).toBeDefined()
})

afterAll(() => {
    mongoose.connection.close()
})