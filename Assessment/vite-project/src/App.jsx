import React from "react";
import { FinanceProvider } from "./context/FinanceContext";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <FinanceProvider>
      <Dashboard />
    </FinanceProvider>
  );
};

export default App;
