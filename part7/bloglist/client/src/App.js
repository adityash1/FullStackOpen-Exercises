import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./reducers/userReducer";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Users from "./components/Users";
import { UserDetail } from "./components/User";
import { Routes, Route, useMatch } from "react-router-dom";
import { initializeUsers } from "./reducers/usersReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, []);

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  const userMatch = useMatch("/users/:id");
  const userIdMatch = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  return (
    <Container maxWidth="sm">
      {user && <h1>Blogs</h1>}
      <Notification />
      <LoginForm />
      <Routes>
        <Route path="/" element={<BlogForm />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail user={userIdMatch} />} />
      </Routes>
    </Container>
  );
};

export default App;
