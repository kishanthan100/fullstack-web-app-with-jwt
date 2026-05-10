import api from "../../../config/axios";

export const dashboard = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};
