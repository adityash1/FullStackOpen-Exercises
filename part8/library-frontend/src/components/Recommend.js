import { useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../queries'
import Book from './Book'

const Recommend = ({ show }) => {
  const booksResult = useQuery(ALL_BOOKS)
  const result = useQuery(CURRENT_USER)

  if (booksResult.loading || result.loading) return <div>loading...</div>

  const me = result.data.me
  const books = booksResult.data.allBooks.filter((b) =>
    b.genres.includes(me.favoriteGenre)
  )

  if (!show) return null
  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <b>{me.favoriteGenre}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <Book key={book.title} book={book} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
