import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const Chart = ({total,completedTask}) => {
    let remaining = total - completedTask
    const isZero = total == 0
  const data = isZero ? [{name: "empty", value: 1}]:[
    { name: "completed", value: completedTask},
    { name: "Pending Task", value: remaining},
  ];
  const colors = isZero ? ["white"] : ["#008000", "#d3d3d3"];
  return (
    <div>
      <div style={{ width: "100%", height: 170 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              dataKey="value"
              stroke="none"
              cornerRadius={30}
              startAngle={90}
              endAngle={-270}
            >
              {data.map((curItem, i) => {
                return <Cell key={i} fill={colors[i]} />;
              })}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#fff" }}
              itemStyle={{ color: "#000" }}
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="26"
                fontWeight="bold"
                fill="white"
            >{completedTask}/{total}</text>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
