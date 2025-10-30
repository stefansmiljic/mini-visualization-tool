import { useEffect, useState } from "react";
import axios from "axios";

export default function useTriviaData() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try{
                const res = await axios.get("https://opentdb.com/api.php?amount=50");
                setQuestions(res.data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return { questions, loading, error}
}