import React from "react";
import { useFinance } from "../context/FinanceContext";
import { Shield, Eye } from "lucide-react";

const RoleSwitcher = () => {
  const { role, switchRole } = useFinance();

  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800/50 dark:to-slate-800/50 border border-blue-200/50 dark:border-slate-700/50 backdrop-blur-xl shadow-lg max-w-md mx-auto animate-spring">
      <div className="text-center mb-2">
        <h2 className="text-lg font-bold text-gray-900 dark:text-dark-text flex items-center justify-center gap-2">
          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Role Access Control
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Choose your access level</p>
      </div>

      <div className="flex gap-3 backdrop-blur-lg bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/30 rounded-xl p-2 w-full">
        <button
          onClick={() => switchRole("viewer")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all duration-300 ${
            role === "viewer"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105"
              : "text-gray-600 dark:text-dark-textSecondary hover:text-gray-900 dark:hover:text-dark-text hover:bg-white/20 dark:hover:bg-slate-700/20"
          }`}
        >
          <Eye className="w-5 h-5" />
          <span>Viewer</span>
        </button>
        <button
          onClick={() => switchRole("admin")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all duration-300 ${
            role === "admin"
              ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg scale-105"
              : "text-gray-600 dark:text-dark-textSecondary hover:text-gray-900 dark:hover:text-dark-text hover:bg-white/20 dark:hover:bg-slate-700/20"
          }`}
        >
          <Shield className="w-5 h-5" />
          <span>Admin</span>
        </button>
      </div>

      <div className="px-4 py-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-800/30 w-full text-center">
        <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">
          {role === "admin"
            ? "🔐 Admin Mode - Add/Delete enabled"
            : "👁️ Viewer Mode - Read-only access"}
        </p>
      </div>
    </div>
  );
};

export default RoleSwitcher;


