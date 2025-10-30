import React, { useMemo, useState } from "react";
import useTriviaData from "./hooks/useTriviaData";
import Filter from "./components/Filter";
import CategoryChart from "./components/CategoryChart";
import DifficultyChart from "./components/DifficultyChart";

export default function App() {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      <h2 style={{ textAlign: "center" }}>Open Trivia Dashboard</h2>
      <Filter categories={categories} selected={selectedCategory} onChange={setSelectedCategory} />
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "350px" }}>
          <CategoryChart data={categoryData} />
        </div>
        <div style={{ flex: 1, minWidth: "350px" }}>
          <DifficultyChart data={difficultyData} />
        </div>
      </div>
    </div>
  );
}