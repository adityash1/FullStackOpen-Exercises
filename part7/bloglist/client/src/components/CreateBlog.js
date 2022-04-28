import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useField } from "../hooks";

import { omit } from "lodash";

const CreateBlog = () => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    dispatch(
      createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      })
    );
    dispatch(
      setNotification(`a new blog by ${title.value} by ${author.value} added`)
    );
    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input {...omit(title, "reset")} />
        </div>
        <div>
          author: <input {...omit(author, "reset")} />
        </div>
        <div>
          url: <input {...omit(url, "reset")} />
        </div>
        <button type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
