import api from "../../../config/axios";

export const listStock = async () => {
  const response = await api.get("/list-stocks");
  return response.data;
};

