const jwt = require('jsonwebtoken')

const User = require('../models/user')
const logger = require('./logger')

const requestLogger = (request, _, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const userExtractor = async function (req, res, next) {
    const token = req.token

    if (token) {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)
        req.user = user
    }

    next()
}

const tokenExtractor = (request, _, next) => {
    const authorization = request.get('authorization')

    request.token = null
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }

    next()
}

const unknownEndpoint = (_, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ 'error': 'invalid token' })
    }

    next(error)
}

module.exports = {
    requestLogger,
    userExtractor,
    tokenExtractor,
    unknownEndpoint,
    errorHandler
}