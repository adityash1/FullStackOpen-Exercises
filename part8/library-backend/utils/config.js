require('dotenv').config((path = '../.env'))

const PORT = process.env.PORT || 4000
let MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET
const USER_PASSWORD = process.env.USER_PASSWORD

module.exports = { MONGODB_URI, PORT, SECRET, USER_PASSWORD }
