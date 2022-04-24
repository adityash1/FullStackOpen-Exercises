import { useDispatch, useSelector } from "react-redux";

import { setUser } from "../reducers/userReducer";

import { setNotification } from "../reducers/notificationReducer";

import { useLogin } from "../hooks";

const LoginForm = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const credentials = useLogin("http://localhost:3001/api/login");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await credentials.login();
      dispatch(setUser(user));
      dispatch(setNotification(`welcome ${user.name}`));
    } catch (exception) {
      console.log(exception);
      dispatch(setNotification("wrong username or password"));
    }
  };

  const handleLogout = () => {
    credentials.logout();
    dispatch(setUser(null));
    dispatch(setNotification("logged out"));
  };

  if (user) {
    return (
      <div>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <h2>log in to application</h2>
        <div>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input {...credentials.username} />
            </div>
            <div>
              password
              <input {...credentials.password} />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      </div>
    );
  }
};

export default LoginForm;
