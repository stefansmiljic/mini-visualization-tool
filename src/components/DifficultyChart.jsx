import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#82ca9d", "#8884d8", "#ffc658"];

export default function DifficultyChart({ data }) {
  const filteredData = data.filter((d)=> d.count > 0);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 style={{ textAlign: "center" }}>Questions by Difficulty</h3>
      <ResponsiveContainer>
        <PieChart margin={{top: 20, right: 30, left: 20, bottom: 30}}>
          <Pie
            dataKey="count"
            data={filteredData}
            nameKey="difficulty"
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={100}
          >
            {filteredData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, _, props) => [`${value}`, props.payload.difficulty]}
          />
          <Legend
            formatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}