const { ApolloServer } = require('apollo-server')
const { typeDefs, resolvers } = require('./gqls')
const mongoose = require('mongoose')
const config = require('./config')

console.log('connecting to mongo...')
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen(config.PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
