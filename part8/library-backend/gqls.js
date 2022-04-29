const { gql } = require('apollo-server')

const Author = require('./modals/Author')
const Book = require('./modals/Book')

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    bookCount: Int
    born: Int
  }
  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await Book.find({})
      return books.length
    },
    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length
    },
    allBooks: async (root, args) => {
      let books = await Book.find({})
      if (args.author) {
        books = books.filter((book) => book.author === args.author)
      }
      if (args.genre) {
        books = books.filter((book) => book.genres.includes(args.genre))
      }
      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root.name })
      return books.length
    },
  },

  Mutation: {
    addBook: async (_, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }
      const book = new Book({ ...args, author: author })
      await book.save()
      return book
    },
    editAuthor: async (_, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      await author.save()
      return author
    },
  },
}

module.exports = { typeDefs, resolvers }
