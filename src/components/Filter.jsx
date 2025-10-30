export default function Filter({ categories, selected, onChange }) {
  return (
    <div className="p-4">
      <label>
        <strong>Category:</strong>{" "}
        <select value={selected} onChange={(e) => onChange(e.target.value)}>
          <option value="All">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}