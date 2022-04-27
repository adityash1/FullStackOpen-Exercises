import Container from "@mui/material/Container";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setUser } from "./reducers/userReducer";

import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Users from "./components/Users";

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
    <Container maxWidth="sm">
      {user && <h1>blogs</h1>}
      <Notification />
      <LoginForm />
      {user && <BlogForm />}
      {user && <Users />}
    </Container>
  );
};

export default App;
