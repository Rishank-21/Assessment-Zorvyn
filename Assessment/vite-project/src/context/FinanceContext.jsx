import React, { createContext, useState, useCallback, useEffect } from "react";
import { mockTransactions } from "../data/mockData";

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : mockTransactions;
  });

  const [role, setRole] = useState(() => {
    const saved = localStorage.getItem("userRole");
    return saved ? saved : "viewer";
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  // Save transactions to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Save role to localStorage
  useEffect(() => {
    localStorage.setItem("userRole", role);
  }, [role]);

  // Save dark mode to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const addTransaction = useCallback(
    (newTransaction) => {
      if (role === "admin") {
        setTransactions((prev) => [
          { ...newTransaction, id: Math.max(...prev.map((t) => t.id), 0) + 1 },
          ...prev,
        ]);
      }
    },
    [role],
  );

  const deleteTransaction = useCallback(
    (id) => {
      if (role === "admin") {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
      }
    },
    [role],
  );

  const switchRole = useCallback((newRole) => {
    setRole(newRole);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
    role,
    switchRole,
    darkMode,
    toggleDarkMode,
  };

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = React.useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within FinanceProvider");
  }
  return context;
};
