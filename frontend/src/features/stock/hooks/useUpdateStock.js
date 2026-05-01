import { useState } from "react";
import { updateStock } from "../services/stockService";

export const useUpdateStock = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpdateStock = async (stocksArray) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const payload = {
        stocks: stocksArray,
      };

      const data = await updateStock(payload);

      setSuccess(true);
      return data;

    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleUpdateStock,
    loading,
    error,
    success,
  };
};