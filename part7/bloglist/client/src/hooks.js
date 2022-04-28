import { useState } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};

const useLogin = (baseUrl) => {
  const username = useField("text");
  const password = useField("password");
  const loggedAppUser = "loggedAppUser";

  const login = async () => {
    const response = await axios.post(baseUrl, {
      username: username.value,
      password: password.value,
    });

    window.localStorage.setItem(loggedAppUser, JSON.stringify(response.data));

    return response.data;
  };

  const clear = () => {
    username.reset();
    password.reset();
  }

  return {
    username,
    password,
    login,
    clear,
  };
};

const useVisible = () => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return {
    visible,
    toggleVisibility,
    hideWhenVisible,
    showWhenVisible,
  };
};

export { useField, useLogin, useVisible };
