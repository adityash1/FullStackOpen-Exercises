import { useEffect, useState } from 'react'

import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommmend from './components/Recommend'
import LoginForm from './components/LoginForm'

import { ALL_BOOKS, BOOK_ADDED } from './queries'

export const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('books')
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (dataInStore && !includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(`${addedBook.name} added`)
      updateCacheWith(addedBook)
    },
  })

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    localStorage.clear()
    setToken(null)
    client.resetStore()
    setPage('login')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && (
          <button onClick={() => setPage('recommmend')}>recommend</button>
        )}
        {token && <button onClick={() => logout()}>logout</button>}
      </div>
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommmend show={page === 'recommmend'} />
      <LoginForm
        show={page === 'login'}
        setPage={setPage}
        setToken={setToken}
      />
    </div>
  )
}

export default App
