import { useEffect, useState } from "react";
import { listStock } from "../services/stockService";

export const allListStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const data = await listStock();
      setLogs(data);
      console.log("FETCHED LOGS:", data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchLogs();
  }, []);

  return { logs, loading, error, fetchLogs};
};