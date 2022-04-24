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
          />
        ))}
      </div>
    </>
  );
};

export default BlogForm;
