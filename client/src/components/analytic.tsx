import { useState, useEffect } from "react";
import { GrAnalytics } from "react-icons/gr";
import { FaChartPie } from "react-icons/fa";
import Back from "./back";
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
  // Label,
  // PieLabelRenderProps,
  Cell,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";

interface expensesdata {
  total: number;
  product: string;
}

interface totalData {
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
  date: string;
}
interface monthlySummary {
  year: number;
  month: number | string;
  expenses: number;
  income: number;
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

const color = [
  "#82ca9d",
  "#0088FE",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF4567",
];

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;
function ExpensesAnalytics() {
  const [expensesData, setExpensesData] = useState<expensesdata[]>([]);
  const [total, setTotal] = useState<totalData>({
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    date: "",
  });
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [sumMonth, _setSumMonth] = useState(6);
  const [sumData, setSumData] = useState<monthlySummary[]>([]);

  useEffect(() => {
    fetchExpensesData();
  }, [month, year]);

  useEffect(() => {
    fetchTotalData();
  }, []);

  useEffect(() => {
    monthlySummary();
  }, [sumMonth]);

  const fetchExpensesData = async () => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/monthly-pie-chart?month=${month}&year=${year}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) {
        return "Failed to fetch Data";
      }
      const data = await res.json();
      setExpensesData(data.data || []);
    } catch (err) {
      console.log("can't fetch data now", err);
    }
  };

  const monthlySummary = async () => {
    try {
      const summaryRes = await fetch(
        `https://budgetbuddy-1-a7pb.onrender.com/api/monthly-summary?months=${sumMonth}`,
        {
          credentials: "include",
        }
      );

      if (!summaryRes.ok) {
        return "Failed to fetch data";
      }
      const summaryData = await summaryRes.json();
      const summary = Array.isArray(summaryData.data) ? summaryData.data : [];
      setSumData(summary);
    } catch (err) {
      console.log(err);
      setSumData([]);
    }
  };
  const fetchTotalData = async () => {
    try {
      const fetchSummary = await fetch(
        `https://budgetbuddy-1-a7pb.onrender.com/api/monthly-summary`,
        {
          credentials: "include",
        }
      );
      const data = await fetchSummary.json();
      if (!fetchSummary.ok) {
        return "Failed to fetch data";
      }
      setTotal({
        totalIncome: data.data.income ?? 0,
        totalExpenses: data.data.expenses ?? 0,
        totalBalance: data.data.balance ?? 0,
        date: `${data.data.month ?? ""}/${data.data.year ?? ""}`,
      });
    } catch (err) {
      console.log("Can't fetch Data", err);
    }
  };
  return (
    <div className="container mx-auto h-auto md:h-[100vh] lg:h-auto bg-[#1d283a]">
      {/*  */}
      <div className="w-[100%] md:w-[98%] mx-auto h-auto p-[10px] flex flex-col gap-6">
        {/* Header */}
        <div className="w-[100%] flex justify-between items-center mt-[40px]">
          <div className="max-w-[200px] md:max-w-[50%] p-[5px]">
            <h4 className="text-sm  lg:text-2xl font-roboto text-white flex items-center gap-2 font-bold">
              <span className=" text-2xl text-red-500">
                <GrAnalytics />
              </span>
              <span>BudgetBuddy Analytics</span>
            </h4>
            <p className="font-lora text-xs lg:text-base  text-[#607090]">
              Track your financial journey with detailed insights
            </p>
          </div>

          <div>
            <Back />
          </div>
        </div>

        <div className=" w-[100%] md:w-[70%] mx-auto mt-[30px]">
          <div className="flex justify-between items-center gap-2">
            {header.map((header, index) => (
              <div
                key={index}
                className="bg-[#3b4d6f] md:w-[200px] flex flex-col justify-center items-center rounded rounded-1xl p-[10px] hover:scale-103 transition transform duration-300 hover:border-[#1d283a] hover:border-[2px]"
              >
                <h4 className="text-white  text-xs md:text-1xl font-bold font-lora">
                  {header.label}
                </h4>
                <p className="text-xs italic font-lora text-gray-300">
                  ₦
                  {(total[header.key as keyof totalData] ?? 0).toLocaleString()}
                </p>
                <small className="text-gray-400">
                  {total.date ? new Date(total.date).toLocaleDateString() : "-"}
                </small>
              </div>
            ))}
          </div>
        </div>

        <div className=" w-[100%] md:w-[70%] mx-auto mt-[20px] flex flex-col justify-center items-center">
          <div className="">
            <h5 className="flex items-center justify-center gap-2 text-base lg:text-2xl font-roboto text-white text-center font-bold">
              <span className="text-[#82ca9d]">
                <FaChartPie />
              </span>
              <span>Expenses by Catergories</span>
            </h5>
          </div>

          <div>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="text-gray-200"
            >
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((m, i) => (
                <option key={i} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="text-gray-200"
            >
              {Array.from({ length: 5 }, (_, i) => currentYear - i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expensesData.map((e) => ({
                  name: String(e.product ?? "Unknown"),
                  value: Number(e.total ?? 0),
                }))}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={(props: PieLabelRenderProps) => {
                  const {
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    percent,
                    name,
                    value,
                  } = props;

                  if (!value || !name) return null;

                  // Cast unknown types to number
                  const cxNum = Number(cx);
                  const cyNum = Number(cy);
                  const midAngleNum = Number(midAngle);
                  const innerRadiusNum = Number(innerRadius);
                  const outerRadiusNum = Number(outerRadius);
                  const percentNum = Number(percent);

                  const RADIAN = Math.PI / 180;
                  const radius =
                    innerRadiusNum + (outerRadiusNum - innerRadiusNum) * 1.2;
                  const x = cxNum + radius * Math.cos(-midAngleNum * RADIAN);
                  const y = cyNum + radius * Math.sin(-midAngleNum * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="white"
                      textAnchor={x > cxNum ? "start" : "end"}
                      dominantBaseline="central"
                      fontSize={10}
                    >
                      {`${name}: ₦${value} (${(percentNum * 100).toFixed(1)}%)`}
                    </text>
                  );
                }}
              >
                {expensesData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={color[index % color.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={sumData.map((item) => ({
                ...item,
                month: String(item.month),
                income: Number(item.income ?? 0),
                expenses: Number(item.expenses ?? 0),
              }))}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#555" />
              <YAxis stroke="#555" />
              <Tooltip />
              <Legend />

              <Bar dataKey="income" fill="#82ca9d" radius={[5, 5, 0, 0]} />
              <Bar dataKey="expenses" fill="#ff4c4c" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
export default ExpensesAnalytics;
