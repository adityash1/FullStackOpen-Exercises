import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Book = ({ book }) => {
  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author.name}</td>
      <td>{book.published}</td>
    </tr>
  )
}

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  if (!show) return null
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <Book key={a.title} book={a} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
