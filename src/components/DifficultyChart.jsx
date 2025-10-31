import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLOR_MAP = {
  easy: "#4ecb8d",    
  medium: "#ff9d3a",  
  hard: "#d83034",    
};

export default function DifficultyChart({ data }) {
  const orderedLevels = ["easy", "medium", "hard"];

  const orderedData = orderedLevels.map((lvl) => {
    const found = data.find((d) => String(d.difficulty).toLowerCase() === lvl);
    return {
      difficulty: lvl,
      count: found ? found.count : 0,
      color: COLOR_MAP[lvl],
    };
  });
  const pieData = orderedData.filter((d) => d.count > 0);

  return (
    <div style={{ width: "100%", height: 340, textAlign: "center" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="count"
            nameKey="difficulty"
            outerRadius={100}            
          >
            {pieData.map((entry) => (
              <Cell key={entry.difficulty} fill={entry.color} />
            ))}
          </Pie>

          {<Tooltip
            formatter={(value, _, props) => {
              const diff = props?.payload?.difficulty || "";
              return [`${value}`, diff.charAt(0).toUpperCase() + diff.slice(1)];
            }}
          />}
        </PieChart>
      </ResponsiveContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 28,
          marginTop: -18,
          alignItems: "center",
          textTransform: "capitalize",
          fontSize: 15,
        }}
      >
        {orderedData.map((d) => (
          <div
            key={d.difficulty}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 8, opacity: 
              d.count === 0 ? 0.45 : 1 
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                background: d.color,
                display: "inline-block",
              }}
            />
            <span style={{ minWidth: 72, textAlign: "left" }}>
              {d.difficulty.charAt(0).toUpperCase() + d.difficulty.slice(1)}
              {d.count > 0 ? ` — ${d.count}` : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
