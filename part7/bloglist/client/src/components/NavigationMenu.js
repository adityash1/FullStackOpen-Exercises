import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const NavigationMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setNotification("logged out"));
  };

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
  }

  if (user) {
    return (
      <div>
        <Link style={style} to="/">blogs</Link>
        <Link style={style} to="/users">users</Link>
        {loginInfo()}
      </div>
    );
  }
  return null;
};

export default NavigationMenu;
