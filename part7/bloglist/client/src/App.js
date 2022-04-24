import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setUser } from "./reducers/userReducer";

import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, []);

  return (
    <div>
      {user && <h1>blogs</h1>}
      <Notification />
      <LoginForm />
      {user && <BlogForm />}
    </div>
  );
};

export default App;
