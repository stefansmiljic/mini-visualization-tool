import { useEffect, useState } from "react";
import axios from "axios";

export default function useTriviaData() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const cached = localStorage.getItem("triviaData");

      try {
        const res = await axios.get("https://opentdb.com/api.php?amount=50");
        setQuestions(res.data.results);
        localStorage.setItem("triviaData", JSON.stringify(res.data.results));
      } catch (err) {
        if (err.response && err.response.status === 429) {
          console.warn("Rate limit hit (429) — loading cached data...");
          if (cached) {
            setQuestions(JSON.parse(cached));
          } else {
            setError("Rate limit reached and no cached data available.");
          }
        } else {
          setError(err.message || "Failed to load data");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { questions, loading, error };
}
