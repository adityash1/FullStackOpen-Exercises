import { Link } from "react-router-dom";

const UserDetail = ({ user }) => {
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <div>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </div>
    </div>
  );
};

const User = ({ user }) => (
  <tr>
    <Link to={`/users/${user.id}`}>
      <td>{user.username}</td>
    </Link>
    <td>{user.blogs.length}</td>
  </tr>
);

export { UserDetail, User };
