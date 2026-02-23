import API from "./axios";

export const getProductById = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};
