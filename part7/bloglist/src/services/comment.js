import axios from "axios";
const baseUrl = "/api/blogs";

const createComment = async (id, text) => {
  const response = await axios.post(baseUrl + "/" + id + "/comments", text);
  return response.data;
};

const exportServices = { createComment };

export default exportServices;