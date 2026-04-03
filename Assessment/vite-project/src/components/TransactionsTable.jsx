import React, { useState, useMemo } from "react";
import { useFinance } from "../context/FinanceContext";
import { Search, Trash2, SortAsc, SortDesc } from "lucide-react";

const TransactionsTable = () => {
  const { transactions, deleteTransaction, role } = useFinance();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const filtered = useMemo(() => {
    // Calculate date 30 days ago from today (dynamic - current date)
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    let result = transactions.filter((t) => {
      const matchSearch = t.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchFilter = filterType === "all" || t.type === filterType;

      // Date range filter (last 30 days)
      const transactionDate = new Date(t.date);
      const isInDateRange =
        transactionDate >= thirtyDaysAgo && transactionDate <= today;

      return matchSearch && matchFilter && isInDateRange;
    });

    // Sort
    result.sort((a, b) => {
      let aValue, bValue;
      if (sortBy === "amount") {
        aValue = a.amount;
        bValue = b.amount;
      } else if (sortBy === "date") {
        aValue = new Date(a.date);
        bValue = new Date(b.date);
      } else {
        aValue = a.category;
        bValue = b.category;
      }

      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });

    return result;
  }, [transactions, searchTerm, filterType, sortBy, sortOrder]);

  const toggleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-gray-900 dark:text-dark-text">
          Recent Transactions
        </h2>
        <div className="px-3 py-1 rounded-full bg-green-100/50 dark:bg-green-900/20">
          <span className="text-xs font-bold text-green-700 dark:text-green-300">
            💳 {filtered.length} Transactions
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="🔍 Search by category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 text-gray-900 dark:text-dark-text font-medium focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors cursor-pointer"
        >
          <option value="all">📊 All Types</option>
          <option value="income">📈 Income</option>
          <option value="expense">📉 Expense</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-slate-700">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800/50 border-b-2 border-gray-200 dark:border-slate-700">
              <th
                className="text-left py-4 px-6 font-bold text-gray-700 dark:text-dark-textSecondary text-sm uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-dark-text transition-colors group"
                onClick={() => toggleSort("date")}
              >
                <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                  📅 Date
                  {sortBy === "date" &&
                    (sortOrder === "asc" ? (
                      <SortAsc className="w-4 h-4 text-blue-500" />
                    ) : (
                      <SortDesc className="w-4 h-4 text-blue-500" />
                    ))}
                </div>
              </th>
              <th className="text-left py-4 px-6 font-bold text-gray-700 dark:text-dark-textSecondary text-sm uppercase tracking-wider">
                🏷️ Category
              </th>
              <th className="text-left py-4 px-6 font-bold text-gray-700 dark:text-dark-textSecondary text-sm uppercase tracking-wider">
                📦 Type
              </th>
              <th
                className="text-right py-4 px-6 font-bold text-gray-700 dark:text-dark-textSecondary text-sm uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-dark-text transition-colors group"
                onClick={() => toggleSort("amount")}
              >
                <div className="flex items-center justify-end gap-2 group-hover:-translate-x-1 transition-transform">
                  Amount 💰
                  {sortBy === "amount" &&
                    (sortOrder === "asc" ? (
                      <SortAsc className="w-4 h-4 text-blue-500" />
                    ) : (
                      <SortDesc className="w-4 h-4 text-blue-500" />
                    ))}
                </div>
              </th>
              {role === "admin" && (
                <th className="text-center py-4 px-6 font-bold text-gray-700 dark:text-dark-textSecondary text-sm uppercase tracking-wider">
                  ⚙️ Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-100 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-smooth group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="py-4 px-6 text-sm font-medium text-gray-700 dark:text-dark-text group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {new Date(transaction.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-900 dark:text-dark-text">
                    {transaction.category}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-bold inline-block ${
                        transaction.type === "income"
                          ? "bg-success/15 text-success dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-danger/15 text-danger dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {transaction.type === "income"
                        ? "✅ Income"
                        : "❌ Expense"}
                    </span>
                  </td>
                  <td
                    className={`py-4 px-6 text-sm font-black text-right ${
                      transaction.type === "income"
                        ? "text-success dark:text-emerald-400"
                        : "text-danger dark:text-red-400"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}₹
                    {transaction.amount.toLocaleString()}
                  </td>
                  {role === "admin" && (
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => deleteTransaction(transaction.id)}
                        className="p-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all hover:scale-110 text-danger hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        title="Delete transaction"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={role === "admin" ? 5 : 4}
                  className="py-12 px-6 text-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">📭</span>
                    <p className="text-gray-500 dark:text-dark-textSecondary font-medium">
                      No transactions found
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-600">
                      Try adjusting your filters
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
