import Alert from "@mui/material/Alert";

import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) {
    return null;
  }

  return <Alert severity="info">{notification}</Alert>;
};

export default Notification;
