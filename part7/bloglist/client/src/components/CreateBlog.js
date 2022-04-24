import { useDispatch } from 'react-redux'
import { useState } from 'react';
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog({ title, author, url }))
    setTitle("")
    setAuthor("")
    setUrl("")
    dispatch(setNotification("a new blog ${title} by ${author} added"))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
