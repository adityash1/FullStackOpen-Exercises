import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import { initializeBlogs } from "../reducers/blogReducer";

import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";

const BlogForm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const blogs = useSelector((state) => state.blogs);

  // const handleLikeChange = async (blog) => {
  //   blogService.update(blog.id, {
  //     title: blog.title,
  //     author: blog.author,
  //     url: blog.url,
  //     likes: blog.likes + 1,
  //   });

  //   await blogService.getBlogByID(blog.id);

  //   const blogs = await blogService.getAll();
  //   setBlogs(blogs);
  //   dispatch(setNotification(`liked blog ${blog.title} by ${blog.author}`));
  // };

  // const handleRemove = async (blog) => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
  //     await blogService.remove(blog.id);

  //     let blogs = await blogService.getAll();
  //     blogs.sort((a, b) => b.likes - a.likes);
  //     setBlogs(blogs);
  //     dispatch(setNotification(`removed blog ${blog.title} by ${blog.author}`));
  //   }
  // };

  return (
    <>
      <div>
        <Togglable buttonLabel="new blog">
          <CreateBlog />
        </Togglable>
    </div>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            // handleLikeChange={handleLikeChange}
            // handleRemove={handleRemove}
          />
        ))}
      </div>
    </>
  );
};

export default BlogForm;
