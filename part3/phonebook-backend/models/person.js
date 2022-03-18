require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')
const uniqVal = require('mongoose-unique-validator')

// eslint-disable-next-line
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
// eslint-disable-next-line no-unused-vars
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
    index: true,
    unique: true,
    minlength: 8,
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// eslint-disable-next-line
phoneBookSchema.plugin(uniqVal)

module.exports = mongoose.model('Person', personSchema)
