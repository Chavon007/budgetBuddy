import { useState, useEffect } from "react";
import {
  BarChart,
  PieChart,
  Bar,
  Pie,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface expensesdata {
  amountSpend: number;
  product: string;
  date: string;
  quantity: number;
}
function ExpensesAnalytics() {
  const [expensesData, setExpensesData] = useState<expensesdata[]>([]);

  useEffect(() => {
    fetchExpensesData();
  }, []);
  const fetchExpensesData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/get-expenses", {
        credentials: "include",
      });
      if (!res.ok) {
        return "Failed to fetch Data";
      }
      const data = await res.json();
      setExpensesData(data.data || []);
    } catch (err) {
      console.log("can't fetch data now", err);
    }
  };
  return (
    <div>
      <h1>welcome</h1>
    </div>
  );
}
export default ExpensesAnalytics;
