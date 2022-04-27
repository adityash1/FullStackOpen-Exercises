import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";

const NavigationMenu = () => {
  const user = useSelector((state) => state.user);

  const handleLogout = () => logout();

  const loginInfo = () => {
    if (user) {
      return (
        <>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </>
      );
    }
  };

  const style = {
    padding: "0.2em",
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar >
          <Link style={style} to="/">blogs</Link>
          <Link style={style} to="/users">users</Link>
          {loginInfo()}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationMenu;
