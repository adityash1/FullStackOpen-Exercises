import { useSelector } from "react-redux";

const User = ({ user }) => (
  <tr>
    <td>{user.user.username}</td>
    <td>{user.blogs.length}</td>
  </tr>
);

const Users = () => {
  const users = useSelector((state) => state);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>{<User key={users.id} user={users} />}</tbody>
        {/* {users.map((user) => (
            <User key={user.id} user={user} />
          ))} */}
      </table>
    </div>
  );
};

export default Users;
