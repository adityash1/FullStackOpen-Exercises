import { useState } from 'react'

import blogService from '../services/blogs'

const Blog = (props) => {
  const { blog, setBlogs, notifyWith } = props

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeChange = async () => {
    blogService.update(blog.id, {
      'title': blog.title,
      'author': blog.author,
      'url': blog.url,
      'likes': blog.likes + 1,
    })

    await blogService.getBlogByID(blog.id)

    const blogs = await blogService.getAll()
    setBlogs(blogs)

    notifyWith(`blog likes+1 ${blog.title} by ${blog.author}`)
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)

      let blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)

      notifyWith(`Removed blog ${blog.title} by ${blog.author}`, 'error')
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='blogTitle'>
        {blog.title} by {blog.author}<button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='blogAll'>
        <div>
          {blog.title} <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} <button onClick={handleLikeChange}>like</button>
        </div>
        <div>{blog.author}</div>
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

export default Blog