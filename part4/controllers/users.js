const User = require('../models/user')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

usersRouter.get('/', async (_, response) => {
    const users = await User.find({}).populate(
        'blogs', { 'url': 1, 'title': 1, 'author': 1 }
    )
    response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    if (body.username.length <= 2) {
        return response.status(400).send({ error: 'username length must be greater than 3' })
    }
    if (body.password.length < 8) {
        return response.status(400).send({ error: 'password must be 8 or more characters long' })
    }

    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter