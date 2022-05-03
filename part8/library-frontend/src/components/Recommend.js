import { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../queries'
import Book from './Book'

const Recommend = ({ show }) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [me, setMe] = useState(null)
  const [books, setBooks] = useState([])

  useQuery(CURRENT_USER, {
    onCompleted: ({ me }) => {
      setMe(me)
      getBooks({ variables: { genre: me.favoriteGenre } })
    },
  })

  useEffect(() => {
    if (result.data) setBooks(result.data.allBooks)
  }, [result])

  if (!show) return null
  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <strong>{me.favoriteGenre}</strong>
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
