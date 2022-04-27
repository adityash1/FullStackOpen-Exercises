import { useSelector } from "react-redux";

import { Blog } from "./Blog";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";

const BlogForm = () => {
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  if (user) {
    return (
      <>
        <div>
          <Togglable buttonLabel="create new">
            <CreateBlog />
          </Togglable>
        </div>
        <div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </>
    );
  }
  return null;
};

export default BlogForm;
