import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { X, Plus } from "lucide-react";
import { categories } from "../data/mockData";

const AddTransactionModal = ({ isOpen, onClose }) => {
  const { addTransaction, role } = useFinance();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    category: "Food",
    type: "expense",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || "" : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.amount || formData.amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    addTransaction({
      date: formData.date,
      amount: formData.amount,
      category: formData.category,
      type: formData.type,
    });

    setFormData({
      date: new Date().toISOString().split("T")[0],
      amount: "",
      category: "Food",
      type: "expense",
    });

    onClose();
    alert("✅ Transaction added successfully!");
  };

  if (!isOpen || role !== "admin") return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl w-full max-w-md p-8 animate-spring">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900 dark:text-dark-text flex items-center gap-2">
            <Plus className="w-6 h-6 text-blue-600" />
            Add Transaction
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-smooth"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Date */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-dark-textSecondary mb-2">
              📅 Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 text-gray-900 dark:text-dark-text focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-dark-textSecondary mb-2">
              💰 Amount
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 text-gray-900 dark:text-dark-text focus:outline-none focus:border-blue-500 transition-colors"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-dark-textSecondary mb-2">
              📦 Type
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, type: "income" }))
                }
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                  formData.type === "income"
                    ? "bg-success text-white shadow-lg"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-slate-600"
                }`}
              >
                📈 Income
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, type: "expense" }))
                }
                className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                  formData.type === "expense"
                    ? "bg-danger text-white shadow-lg"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-slate-600"
                }`}
              >
                📉 Expense
              </button>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-dark-textSecondary mb-2">
              🏷️ Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 text-gray-900 dark:text-dark-text focus:outline-none focus:border-blue-500 transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-lg bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-dark-text font-bold hover:bg-gray-300 dark:hover:bg-slate-600 transition-smooth"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold hover:shadow-lg transition-smooth"
            >
              ✅ Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
