import React, { useMemo, useState, useEffect } from "react";
import useTriviaData from "./hooks/useTriviaData";
import Filter from "./components/Filter";
import CategoryChart from "./components/CategoryChart";
import DifficultyChart from "./components/DifficultyChart";
import "./App.css";

export default function App() {
  const [theme, setTheme] = useState("light");

  useEffect(()=> {
    document.body.setAttribute("data-theme", theme)
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev)=>(prev==="light"?"dark":"light"));
  }

  const { questions, loading, error } = useTriviaData();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const all = [...new Set(questions.map((q) => q.category))];
    return all.sort();
  }, [questions]);

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return questions;
    return questions.filter((q) => q.category === selectedCategory);
  }, [questions, selectedCategory]);

  const categoryData = useMemo(() => {
    const map = {};
    filtered.forEach((q) => (map[q.category] = (map[q.category] || 0) + 1));
    return Object.entries(map).map(([category, count]) => ({ category, count }));
  }, [filtered]);

  const difficultyData = useMemo(() => {
    const map = { easy: 0, medium: 0, hard: 0 };
    filtered.forEach((q) => (map[q.difficulty] = (map[q.difficulty] || 0) + 1));
    return Object.entries(map).map(([difficulty, count]) => ({ difficulty, count }));
  }, [filtered]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading questions...</p>;
  if (error) return <p style={{ textAlign: "center" }}>Error: {error}</p>;

  return (
    <>
      <header className="header">
        <h1>Trivia Data Dashboard</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      <main>
        <div className="filter-section">
          <Filter
            categories={categories}
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        <div className="dashboard">
      <div className="chart-card">
        <h2>Questions by Category</h2>
        <CategoryChart data={categoryData} />
      </div>
      <div className="chart-card">
        <h2>Questions by Difficulty</h2>
        <DifficultyChart data={difficultyData} />
      </div>
    </div>

    <footer>Data source: Open Trivia DB</footer>
      </main>
    </>
  );
}
