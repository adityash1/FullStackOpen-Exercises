import { useDispatch } from "react-redux";

import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

import { useVisible } from "../hooks";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const visible = useVisible();

  const handleLikeChange = () => {
    const newObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };

    dispatch(likeBlog(blog.id, newObject));
    dispatch(setNotification(`liked blog ${blog.title} by ${blog.author}`));
  };

  const handleRemove = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
      dispatch(setNotification(`removed blog ${blog.title} by ${blog.author}`));
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div style={visible.hideWhenVisible} className="blogTitle">
        {blog.title} by {blog.author}
        <button onClick={visible.toggleVisibility}>view</button>
      </div>
      <div style={visible.showWhenVisible} className="blogAll">
        <div>
          {blog.title} <button onClick={visible.toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div id="likes">
          {blog.likes}{" "}
          <button onClick={() => handleLikeChange(blog)}>like</button>
        </div>
        <div>{blog.author}</div>
        <button onClick={() => handleRemove(blog)}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
