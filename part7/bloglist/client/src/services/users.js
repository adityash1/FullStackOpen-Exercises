import axios from "axios";

import config from "./blogs";

const baseUrl = "/api/users";

const getAll = async () => {
  const request = await axios.get(baseUrl, config);
  return request.data;
};

export default {
  getAll,
};
