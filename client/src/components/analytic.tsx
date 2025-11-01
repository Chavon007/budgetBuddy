import { useState, useEffect } from "react";
import { GrAnalytics } from "react-icons/gr";
import { FaChartPie } from "react-icons/fa";
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
    key: "totalIncome",
  },
  {
    label: "Total Expenses",
    key: "totalExpenses",
  },
  {
    label: "Balance",
    key: "totalBalance",
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
    totalData();
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
          fetch("http://localhost:5000/api/get-total-income", {
            credentials: "include",
          }),
          fetch("http://localhost:5000/api/totalexpenses", {
            credentials: "include",
          }),
          fetch("http://localhost:5000/api/get-total-balance", {
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
        totalBalance: totalBalanceData.data || 0,
        totalExpenses: totalExpensesData.data || 0,
        totalIncome: totalIncomeData.data || 0,
        date: new Date().toISOString(),
      });
    } catch (err) {
      console.log("Can't fetch Data", err);
    }
  };
  return (
    <div className="container mx-auto h-[109vh] bg-[#1d283a]">
      {/*  */}
      <div className="w-[100%] md:w-[90%] mx-auto h-auto p-[10px] flex flex-col gap-6">
        {/* Header */}
        <div className="w-[100%] lg:w-[50%] lg:mx-auto mt-[40px]">
          <h2 className="text-1xl flex items-center gap-2 justify-center lg:text-4xl font-roboto text-white text-center font-bold">
            <span className="text-red-500"><GrAnalytics/></span>
            <span>BudgetBuddy Analytics</span>
          </h2>
          <p className="font-lora text-sm lg:text-1xl font-bold text-center text-[#607090]">
            Track your financial journey with detailed insights
          </p>
        </div>

        <div className=" w-[100%] md:w-[70%] mx-auto mt-[20px]">
          <div className="flex justify-between items-center gap-2">
            {header.map((header, index) => (
              <div
                key={index}
                className="bg-[#3b4d6f] md:w-[200px] flex flex-col justify-center items-center rounded rounded-1xl p-[10px] hover:scale-103 transition transform duration-300 hover:border-[#1d283a] hover:border-[2px]"
              >
                <h4 className="text-white  text-sm md:text-1xl font-bold font-lora">
                  {header.label}
                </h4>
                <p className="text-xs italic font-lora text-gray-300">
                  ₦{(total[header.key as keyof totalData] || 0).toLocaleString()}
                </p>
                <small>{total.date}</small>
              </div>
            ))}
          </div>
        </div>

        <div className=" w-[100%] md:w-[70%] mx-auto mt-[20px] flex flex-col justify-center items-center">
          <div className="">
            <h5 className="flex items-center justify-center gap-2 text-base lg:text-2xl font-roboto text-white text-center font-bold"><span className="text-[#82ca9d]"><FaChartPie/></span><span>Expenses by Catergories</span></h5>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expensesData.map((e) => ({
                  name: e.product,
                  value: e.amountSpend,
                }))}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#82ca9d"
                label={({ name, value }) => {
                  const total = expensesData.reduce(
                    (acc, item) => acc + item.amountSpend,
                    0
                  );
                  const percent = ((value / total) * 100).toFixed(1);
                  return `${name}: ₦${value} (${percent}%)`;
                }}
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
export default ExpensesAnalytics;
