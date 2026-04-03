import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { Moon, Sun, Plus } from "lucide-react";
import RoleSwitcher from "../components/RoleSwitcher";
import DashboardCards from "../components/DashboardCards";
import BalanceChart from "../components/BalanceChart";
import CategoryChart from "../components/CategoryChart";
import TransactionsTable from "../components/TransactionsTable";
import Insights from "../components/Insights";
import AddTransactionModal from "../components/AddTransactionModal";

const Dashboard = () => {
  const { darkMode, toggleDarkMode, role } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg transition-colors duration-300">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-300/10 dark:bg-cyan-500/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 border-b border-white/30 dark:border-slate-700/30 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-smooth animate-float">
                <span className="text-white font-bold text-xl">₹</span>
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  Finance Dashboard
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
                  Smart Money Management
                </p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-3 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-xl transition-smooth hover:scale-110 group"
              title="Toggle dark mode"
            >
              {darkMode ? (
                <Sun
                  className="w-6 h-6 text-yellow-400 animate-spin"
                  style={{ animationDuration: "3s" }}
                />
              ) : (
                <Moon
                  className="w-6 h-6 text-blue-600 animate-spin"
                  style={{ animationDuration: "3s" }}
                />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Role Switcher */}
        <div className="flex justify-center mb-12 animate-slide-up">
          <RoleSwitcher />
        </div>

        {/* Add Transaction Button (Admin Only) */}
        {role === "admin" && (
          <div className="flex justify-center mb-8 animate-slide-up" style={{ animationDelay: "0.05s" }}>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-smooth"
            >
              <Plus className="w-5 h-5" />
              Add Transaction
            </button>
          </div>
        )}

        {/* Cards */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <DashboardCards />
        </div>

        {/* Charts */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <BalanceChart />
          <CategoryChart />
        </div>

        {/* Transactions Table */}
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <TransactionsTable />
        </div>

        {/* Insights */}
        <div
          className="mt-8 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Insights />
        </div>

        {/* Add Transaction Modal */}
        <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </main>
    </div>
  );
};

export default Dashboard;
