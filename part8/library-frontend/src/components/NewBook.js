import { useState } from "react";
import { useField } from "../hooks";
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";
import { useMutation } from "@apollo/client";
import { omit } from "lodash";

const NewBook = (props) => {
  const title = useField("text");
  const author = useField("text");
  const published = useField("number");
  const genre = useField("text");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    addBook({
      variables: {
        title: title.value,
        author: author.value,
        published: Number(published.value),
        genres,
      },
    });

    title.reset();
    author.reset();
    published.reset();
    genre.reset();
    setGenres([]);
  };

  const addGenre = () => {
    setGenres(genres.concat(genre.value));
    genre.reset();
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input {...omit(title, "reset")} />
        </div>
        <div>
          author
          <input {...omit(author, "reset")} />
        </div>
        <div>
          published
          <input {...omit(published, "reset")} />
        </div>
        <div>
          <input {...omit(genre, "reset")} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
