import React from "react";
import { useFinance } from "../context/FinanceContext";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

const DashboardCards = () => {
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

  const income = last30DaysTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = last30DaysTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  const cards = [
    {
      title: "Total Balance",
      amount: balance,
      icon: Wallet,
      color: "from-blue-500 to-cyan-500",
      bgColor:
        "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
    },
    {
      title: "Total Income",
      amount: income,
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      bgColor:
        "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    },
    {
      title: "Total Expenses",
      amount: expenses,
      icon: TrendingDown,
      color: "from-red-500 to-pink-500",
      bgColor:
        "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const borderColor = card.color.includes("blue")
          ? "#38BDF8"
          : card.color.includes("green")
            ? "#4ADE80"
            : "#F87171";
        
        return (
          <div
            key={index}
            className={`card card-hover bg-gradient-to-br ${card.bgColor} relative group overflow-hidden`}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {/* Animated gradient border */}
            <div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r"
              style={{
                backgroundImage: `linear-gradient(90deg, ${borderColor}, transparent)`,
              }}
            ></div>

            {/* Floating background element */}
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-smooth"
              style={{backgroundColor: borderColor}}
            ></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-dark-textSecondary uppercase tracking-wide">
                  {card.title}
                </h3>
                <div
                  className={`p-4 rounded-lg bg-gradient-to-br ${card.color}/15 group-hover:scale-110 transition-smooth`}
                >
                  <Icon className="w-6 h-6" style={{color: borderColor}} />
                </div>
              </div>

              <div>
                <p className="text-4xl font-black text-gray-900 dark:text-dark-text tracking-tight">
                  ₹{balance < 0 && card.title === "Total Balance" ? "-" : ""}
                  {Math.abs(card.amount).toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                </p>
                <div className="flex items-center mt-3 gap-2">
                  <div className="h-1 w-8 bg-gradient-to-r" style={{backgroundImage: `linear-gradient(90deg, ${borderColor}, transparent)`}}></div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-dark-textSecondary">
                    {card.title === "Total Balance"
                      ? balance >= 0
                        ? "Healthy Balance"
                        : "Negative"
                      : "This Month"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCards;
