import React, { useMemo } from "react";
import { useFinance } from "../context/FinanceContext";
import { TrendingUp, AlertCircle, Target } from "lucide-react";

const Insights = () => {
  const { transactions } = useFinance();

  const insights = useMemo(() => {
    // Calculate date 30 days ago from today (dynamic - current date)
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Filter transactions from last 30 days
    const last30DaysTransactions = transactions.filter((t) => {
      const transactionDate = new Date(t.date);
      return transactionDate >= thirtyDaysAgo && transactionDate <= today;
    });

    // Calculate highest spending category
    const categoryTotals = {};
    last30DaysTransactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        categoryTotals[t.category] =
          (categoryTotals[t.category] || 0) + t.amount;
      });
    const topCategory =
      Object.entries(categoryTotals).length > 0
        ? Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]
        : null;

    // Current vs last month
    const currentMonth = last30DaysTransactions.filter((t) => {
      const date = new Date(t.date);
      return date.getMonth() === today.getMonth();
    });
    const lastMonth = last30DaysTransactions.filter((t) => {
      const date = new Date(t.date);
      const lastMonthDate = new Date(today.getFullYear(), today.getMonth() - 1);
      return date.getMonth() === lastMonthDate.getMonth();
    });

    const currentExpenses = currentMonth
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);
    const lastMonthExpenses = lastMonth
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);

    const expenseChange =
      lastMonthExpenses > 0
        ? ((currentExpenses - lastMonthExpenses) / lastMonthExpenses) * 100
        : 0;

    // Average transaction
    const avgTransaction =
      last30DaysTransactions.length > 0
        ? last30DaysTransactions.reduce((acc, t) => acc + t.amount, 0) /
          last30DaysTransactions.length
        : 0;

    return {
      topCategory,
      currentExpenses,
      lastMonthExpenses,
      expenseChange,
      avgTransaction,
      totalTransactions: last30DaysTransactions.length,
    };
  }, [transactions]);

  return (
    <div className="card">
      <h2 className="text-2xl font-black text-gray-900 dark:text-dark-text mb-8 flex items-center gap-3">
        <div className="p-3 rounded-lg bg-gradient-to-br from-accent/20 to-purple-100 dark:from-accent/10 dark:to-purple-900/10">
          <Target className="w-6 h-6 text-accent" />
        </div>
        Financial Insights & Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Category */}
        <div className="group p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200/50 dark:border-purple-800/30 hover:shadow-lg transition-smooth hover:scale-105 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-600 dark:text-dark-textSecondary uppercase tracking-wide flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Top Spending
            </h3>
            <div className="px-3 py-1 rounded-full bg-purple-200/50 dark:bg-purple-800/50">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
                Category
              </span>
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-dark-text group-hover:text-purple-600 transition-smooth">
            {insights.topCategory ? insights.topCategory[0] : "N/A"}
          </p>
          <div className="mt-3 pt-3 border-t border-purple-200/50 dark:border-purple-800/30">
            <p className="text-sm font-bold text-gray-600 dark:text-dark-textSecondary">
              ₹
              {insights.topCategory
                ? insights.topCategory[1].toLocaleString()
                : 0}
            </p>
            <p className="text-xs text-gray-500 dark:text-dark-textSecondary mt-1">
              Most spent category
            </p>
          </div>
        </div>

        {/* Month Comparison */}
        <div className="group p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200/50 dark:border-blue-800/30 hover:shadow-lg transition-smooth hover:scale-105 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-600 dark:text-dark-textSecondary uppercase tracking-wide flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Month Change
            </h3>
            <div
              className={`px-3 py-1 rounded-full ${insights.expenseChange > 0 ? "bg-red-200/50 dark:bg-red-800/50" : "bg-green-200/50 dark:bg-green-800/50"}`}
            >
              <span
                className={`text-xs font-bold ${insights.expenseChange > 0 ? "text-red-700 dark:text-red-300" : "text-green-700 dark:text-green-300"}`}
              >
                {insights.expenseChange > 0 ? "📈" : "📉"}
              </span>
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-dark-text group-hover:text-blue-600 transition-smooth">
            {insights.expenseChange > 0 ? "+" : ""}
            {insights.expenseChange.toFixed(1)}%
          </p>
          <div className="mt-3 pt-3 border-t border-blue-200/50 dark:border-blue-800/30">
            <p className="text-sm font-bold text-gray-600 dark:text-dark-textSecondary">
              {insights.expenseChange > 0
                ? "Expenses increased"
                : "Expenses decreased"}
            </p>
            <p className="text-xs text-gray-500 dark:text-dark-textSecondary mt-1">
              Compared to last month
            </p>
          </div>
        </div>

        {/* Average Transaction */}
        <div className="group p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-800/30 hover:shadow-lg transition-smooth hover:scale-105 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-600 dark:text-dark-textSecondary uppercase tracking-wide flex items-center gap-2">
              <span className="text-lg">📊</span>
              Avg Transaction
            </h3>
            <div className="px-3 py-1 rounded-full bg-green-200/50 dark:bg-green-800/50">
              <span className="text-xs font-bold text-green-700 dark:text-green-300">
                {insights.totalTransactions}
              </span>
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-dark-text group-hover:text-green-600 transition-smooth">
            ₹
            {insights.avgTransaction.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
          <div className="mt-3 pt-3 border-t border-green-200/50 dark:border-green-800/30">
            <p className="text-sm font-bold text-gray-600 dark:text-dark-textSecondary">
              Across all transactions
            </p>
            <p className="text-xs text-gray-500 dark:text-dark-textSecondary mt-1">
              Total: {insights.totalTransactions} transactions
            </p>
          </div>
        </div>

        {/* Current Month Expenses */}
        <div className="group p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200/50 dark:border-orange-800/30 hover:shadow-lg transition-smooth hover:scale-105 cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-600 dark:text-dark-textSecondary uppercase tracking-wide flex items-center gap-2">
              <span className="text-lg">💸</span>
              This Month
            </h3>
            <div className="px-3 py-1 rounded-full bg-orange-200/50 dark:bg-orange-800/50">
              <span className="text-xs font-bold text-orange-700 dark:text-orange-300">
                Current
              </span>
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-dark-text group-hover:text-orange-600 transition-smooth">
            ₹{insights.currentExpenses.toLocaleString()}
          </p>
          <div className="mt-3 pt-3 border-t border-orange-200/50 dark:border-orange-800/30">
            <p className="text-sm font-bold text-gray-600 dark:text-dark-textSecondary">
              Last month: ₹{insights.lastMonthExpenses.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 dark:text-dark-textSecondary mt-1">
              April 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
