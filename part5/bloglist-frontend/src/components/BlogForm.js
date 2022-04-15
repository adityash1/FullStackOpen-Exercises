import React from 'react'

import Blog from './Blog'

const BlogForm = (props) => {
  const { blogs, setBlogs, notifyWith } = props

  return (
    <div>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} notifyWith={notifyWith}/>
        )
      }
    </div>
  )
}

export default BlogForm