import React from "react";
import { useFinance } from "../context/FinanceContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { categories } from "../data/mockData";

const CategoryChart = () => {
  const { transactions } = useFinance();

  // Calculate date 30 days ago from today (dynamic - current date)
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Filter transactions from last 30 days
  const last30DaysTransactions = transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return transactionDate >= thirtyDaysAgo && transactionDate <= today;
  });

  // Group expenses by category
  const categoryData = last30DaysTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, transaction) => {
      const existing = acc.find((item) => item.name === transaction.category);
      if (existing) {
        existing.value += transaction.amount;
      } else {
        acc.push({ name: transaction.category, value: transaction.amount });
      }
      return acc;
    }, []);

  const colors = categoryData.map((item) => {
    const category = categories.find((c) => c.name === item.name);
    return category ? category.color : "#94A3B8";
  });

  return (
    <div className="card group">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-gray-900 dark:text-dark-text">
          Expenses by Category
        </h2>
        <div className="px-3 py-1 rounded-full bg-purple-100/50 dark:bg-purple-900/20">
          <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
            🥧 Distribution
          </span>
        </div>
      </div>
      <div className="group-hover:shadow-lg transition-smooth rounded-lg overflow-hidden">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={85}
              innerRadius={40}
              fill="#8884d8"
              dataKey="value"
              isAnimationActive={true}
              animationDuration={800}
            >
              {colors.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                border: "2px solid #A78BFA",
                borderRadius: "12px",
                color: "#E2E8F0",
                padding: "12px",
                boxShadow: "0 20px 25px -5px rgba(167, 139, 250, 0.2)",
              }}
              formatter={(value) => `₹${value.toLocaleString()}`}
              labelStyle={{ color: "#E2E8F0" }}
            />
            <Legend wrapperStyle={{ color: "#94A3B8", paddingTop: "20px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryChart;
