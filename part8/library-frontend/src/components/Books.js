import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Genre from './Genre'
import { useState } from 'react'
import Book from './Book'

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }

  let books = result.data.allBooks

  let genres = Array.prototype.concat.apply(
    [],
    books.map((b) => b.genres)
  )
  genres = [...new Set(genres)]

  if (genre) {
    books = books.filter((b) => b.genres.includes(genre))
  }

  if (!show) return null
  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{genre}</b>
      </p>
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
        <Genre genres={genres} setGenre={setGenre} />
      </table>
    </div>
  )
}

export default Books
