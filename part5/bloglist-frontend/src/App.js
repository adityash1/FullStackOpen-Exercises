import React, { useState, useEffect, useRef } from 'react'

import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const createBlogRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  const notifyWith = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => { setNotification(null) }, 3000)
  }

  const addBlog = (blogObject) => {
    createBlogRef.current.toggleVisibility()
    blogService.create(blogObject).then(returnedBlog =>
      setBlogs(blogs.concat(returnedBlog))
    )

    notifyWith(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => { }, 3000)
  }

  const createBlog = () => {
    return (
      <Togglable buttonLabel='new blog' ref={createBlogRef}>
        <CreateBlog createBlog={addBlog} />
      </Togglable>
    )
  }

  return (
    <div>
      <Notification notification={notification} />
      {user && <h1>blogs</h1>}
      <LoginForm
        notifyWith={notifyWith}
        user={user}
        setUser={setUser}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      {user && createBlog()}
      {
        user &&
				<BlogForm blogs={blogs} setBlogs={setBlogs} notifyWith={notifyWith} />
      }
    </div>
  )
}

export default App