import { useDispatch } from "react-redux";

import { setNotification } from "../reducers/notificationReducer";

import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";

import blogService from "../services/blogs";

const BlogForm = (props) => {
  const dispatch = useDispatch();

  const { blogs, setBlogs } = props;

  const createBlog = () => (
    <Togglable buttonLabel="new blog">
      <CreateBlog addBlog={addBlog} />
    </Togglable>
  );

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => setBlogs(blogs.concat(returnedBlog)))
      .then(() => {
        dispatch(
          setNotification(
            `a new blog ${blogObject.title} by ${blogObject.author} added`
          )
        );
      });
  };

  const handleLikeChange = async (blog) => {
    blogService.update(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    });

    await blogService.getBlogByID(blog.id);

    const blogs = await blogService.getAll();
    setBlogs(blogs);
    dispatch(setNotification(`liked blog ${blog.title} by ${blog.author}`));
  };

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);

      let blogs = await blogService.getAll();
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
      dispatch(setNotification(`removed blog ${blog.title} by ${blog.author}`));
    }
  };

  return (
    <>
      <div>{createBlog()}</div>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikeChange={handleLikeChange}
            handleRemove={handleRemove}
          />
        ))}
      </div>
    </>
  );
};

export default BlogForm;
