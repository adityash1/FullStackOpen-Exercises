const { ApolloServer } = require('apollo-server')
const { typeDefs, resolvers } = require('./gqls')
const { mongoose } = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const jwt = require('jsonwebtoken')

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen(config.PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
