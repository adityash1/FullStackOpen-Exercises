const { ApolloServer } = require('apollo-server')
const { typeDefs, resolvers } = require('./gqls')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen(config.PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
