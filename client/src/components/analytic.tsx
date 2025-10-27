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
  Label,
} from "recharts";

interface expensesdata {
  amountSpend: number;
  product: string;
  date: string;
  quantity: number;
}

interface totalData {
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
  date: string;
}
const header = [
  {
    label: "Total Income",
  },
  {
    label: "Total Expenses",
  },
  {
    label: "Balance",
  },
];
function ExpensesAnalytics() {
  const [expensesData, setExpensesData] = useState<expensesdata[]>([]);
  const [total, setTotal] = useState<totalData>({
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    date: "",
  });
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

  const totalData = async () => {
    try {
      const [totalIncomeRes, totalExpensesRes, totalBalanceRes] =
        await Promise.all([
          fetch("", {
            credentials: "include",
          }),
          fetch("", {
            credentials: "include",
          }),
          fetch("", {
            credentials: "include",
          }),
        ]);
      if (!totalBalanceRes.ok || !totalExpensesRes.ok || !totalIncomeRes.ok) {
        return "Failed to fetch data";
      }
      const totalIncomeData = await totalIncomeRes.json();
      const totalExpensesData = await totalExpensesRes.json();
      const totalBalanceData = await totalBalanceRes.json();

      setTotal({
        totalBalance: totalBalanceData.data?.totalBalance || 0,
        totalExpenses: totalExpensesData.data?.totalExpenses || 0,
        totalIncome: totalIncomeData.data?.totalIncome || 0,
        date: Date.now().toString(),
      });
    } catch (err) {
      console.log("Can't fetch Data", err);
    }
  };
  return (
    <div className="container mx-auto">
      {/*  */}
      <div>
        {/* Header */}
        <div>
          <h2>BudgetBuddy Analytics</h2>
          <p>Track your financial journey with detailed insights</p>
        </div>

        <div>
          <div>
            {header.map((header, index) => (
              <div key={index}>
                <h4>{header.label}</h4>
              </div>
            ))}
            <p>{total.totalIncome}</p>
            <p>{total.totalExpenses}</p>
            <p>{total.totalBalance}</p>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}
export default ExpensesAnalytics;
