require('dotenv').config((path = '../.env'))

const PORT = process.env.PORT || 4000
let MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET
const USER_PASSWORD = process.env.USER_PASSWORD

module.exports = { MONGODB_URI, PORT, JWT_SECRET, USER_PASSWORD }
