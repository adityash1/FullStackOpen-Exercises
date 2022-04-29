import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useField } from "../hooks";
import { omit } from "lodash";

const Authors = (props) => {
  const name = useField("text");
  const born = useField("number");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleUpdate = async (event) => {
    event.preventDefault();

    editAuthor({
      variables: {
        name: name.value,
        setBornTo: Number(born.value),
      },
    });

    name.reset();
    born.reset();
  };

  const result = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>set birthyear</h3>
      <form onSubmit={handleUpdate}>
        <div>
          name:
          <input {...omit(name, "reset")} />
        </div>
        <div>
          born:
          <input {...omit(born, "reset")} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
