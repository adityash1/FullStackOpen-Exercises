import Alert from "@mui/material/Alert";

import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  // const style = {
  //   border: "solid",
  //   padding: 10,
  //   borderWidth: 1,
  // };

  if (notification === null) {
    return null;
  }

  return <Alert severity="info">{notification}</Alert>;
};

export default Notification;
