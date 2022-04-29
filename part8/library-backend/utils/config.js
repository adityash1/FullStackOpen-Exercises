require('dotenv').config((path = '../.env'))

const PORT = process.env.PORT || 4000
let MONGODB_URI = process.env.MONGODB_URI

module.exports = { MONGODB_URI, PORT }
