import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const config = () => {
  return {
    headers: { Authorization: token },
  };
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const getBlogByID = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return request.data;
};

const remove = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.data;
};

const addComment = async (id, comment) => {
  const request = await axios.post(`${baseUrl}/${id}/comments`, comment, config)
  return request.data
}

export default { getAll, getBlogByID, create, update, remove, setToken, config, addComment };
