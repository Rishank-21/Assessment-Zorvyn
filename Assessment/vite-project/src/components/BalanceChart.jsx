import React from "react";
import { useFinance } from "../context/FinanceContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BalanceChart = () => {
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

  // Group transactions by date and calculate running balance
  const dailyData = last30DaysTransactions
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .reduce((acc, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString("en-IN");
      const lastBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
      const amount =
        transaction.type === "income"
          ? transaction.amount
          : -transaction.amount;
      const newBalance = lastBalance + amount;

      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing.balance = newBalance;
      } else {
        acc.push({ date, balance: newBalance });
      }
      return acc;
    }, []);

  return (
    <div className="card mb-8 group">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-gray-900 dark:text-dark-text">
          Balance Over Time
        </h2>
        <div className="px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/20">
          <span className="text-xs font-bold text-blue-700 dark:text-blue-300">
            📈 Trend
          </span>
        </div>
      </div>
      <div className="group-hover:shadow-lg transition-smooth rounded-lg overflow-hidden">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={dailyData}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(156, 163, 175, 0.15)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="rgba(156, 163, 175, 0.5)"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="rgba(156, 163, 175, 0.5)"
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                border: "2px solid #38BDF8",
                borderRadius: "12px",
                color: "#E2E8F0",
                padding: "12px",
                boxShadow: "0 20px 25px -5px rgba(56, 189, 248, 0.2)",
              }}
              formatter={(value) => [`₹${value.toLocaleString()}`, "Balance"]}
              labelStyle={{ color: "#E2E8F0" }}
            />
            <Legend wrapperStyle={{ color: "#94A3B8", paddingTop: "20px" }} />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#38BDF8"
              strokeWidth={3}
              dot={{ fill: "#38BDF8", r: 5, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 8 }}
              name="Balance"
              isAnimationActive={true}
              animationDuration={800}
              fillOpacity={1}
              fill="url(#colorBalance)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceChart;
