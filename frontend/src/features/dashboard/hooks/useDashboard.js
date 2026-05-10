import { useEffect,useState } from "react";
import { dashboard } from "../services/dashboardService";


export const useDashboardHook = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect (() => {
        const fetchLogs = async () => {
            try{
                setLoading(true);
                const data = await dashboard();
                setLogs(data);
            } catch (err) {
                if (err.response?.status !== 401){
                    setError("Something went wrong.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    return {logs, loading, error};

};