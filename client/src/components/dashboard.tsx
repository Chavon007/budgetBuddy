import { useState, useEffect } from "react";
import { FaRegHandPeace } from "react-icons/fa";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { GrAnalytics } from "react-icons/gr";
import { GoGoal } from "react-icons/go";
import { Link } from "react-router-dom";
import { MdAccountBalanceWallet } from "react-icons/md";
import Back from "./back";

interface totalData {
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
  date: string;
}
interface setGoalData {
  theGoal: string;
  createdAt: string;
}
interface expensesData {
  amountSpend: number;
  product: string;
  date: string;
  quantity: number;
}
const header = [
  {
    label: "Income",
    key: "totalIncome",
    icon: <IoArrowUpCircleOutline />,
  },
  {
    label: "Expenses",
    key: "totalExpenses",
    icon: <IoArrowDownCircleOutline />,
  },
];

const pageLink = [
  {
    link: "/income",
    name: "Add income",
    icon: <IoArrowUpCircleOutline />,
  },
  {
    link: "/expenses",
    name: "Add Expenses",
    icon: <IoArrowDownCircleOutline />,
  },
  {
    link: "/goal",
    name: "Set Goals",
    icon: <GoGoal />,
  },
  {
    link: "/analysis",
    name: "View Analytic",
    icon: <GrAnalytics />,
  },
];

function Dashboard() {
  const [total, setTotal] = useState<totalData>({
    totalIncome: 0,
    totalBalance: 0,
    totalExpenses: 0,
    date: "",
  });

  const [expenses, setExpenses] = useState<expensesData[]>([]);

  const [goal, setGoal] = useState<setGoalData[]>([]);

  const totalData = async () => {
    try {
      const [totalIncomeRes, totalExpensesRes, totalBalanceRes] =
        await Promise.all([
          fetch(`https://budgetbuddy-1-a7pb.onrender.com/api/get-total-income`, {
            credentials: "include",
          }),
          fetch(`https://budgetbuddy-1-a7pb.onrender.com/api/totalexpenses`, {
            credentials: "include",
          }),
          fetch(`https://budgetbuddy-1-a7pb.onrender.com/api/get-total-balance`, {
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

  const getGoals = async () => {
    try {
      const goals = await fetch("https://budgetbuddy-1-a7pb.onrender.com/api/get-goals", {
        credentials: "include",
      });

      if (!goals.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await goals.json();
      setGoal(data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const expensesData = async () => {
    try {
      const expensesRes = await fetch(
        "https://budgetbuddy-1-a7pb.onrender.com/api/get-expenses",
        {
          credentials: "include",
        }
      );
      if (!expensesRes.ok) {
        throw new Error("Failed to fetch  data");
      }
      const mainExpensesData = await expensesRes.json();
      setExpenses(mainExpensesData.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    totalData();
    getGoals();
    expensesData();
  }, []);
  return (
    <div className="container mx-auto h-auto bg-[#1d283a]">
      <div className="w-[100%] md:w-[98%] mx-auto h-auto py-[10px] flex flex-col gap-6">
        <div className="w-[100%] flex justify-between items-centers mt-[40px]">
          <div>
            <h2 className="text-1xl flex items-center gap-2 lg:text-2xl font-roboto text-white text-center font-bold">
              <span>Welcome back!</span>
              <span className="text-green-500 animate-bounce">
                <FaRegHandPeace />
              </span>
            </h2>
            <p className="font-lora text-sm font-semibold text-[#607090]">
              Here's your financial overview
            </p>
          </div>
          <div>
            <Back />
          </div>
        </div>
        {/* balance */}

        <div className="w-[98%] p-[30px] gap-2 rounded rounded-3xl mx-auto bg-gradient-to-br from-[#35506b] to-[#1f2e45]">
          <div className=" flex flex-col">
            <h4 className="flex items-center gap-1 text-white font-bold font-inter">
              <span className="bg-green-500 text-white text-3xl p-[10px]">
                <MdAccountBalanceWallet />
              </span>
              <span className="text-base">Current Balance</span>
            </h4>
            <p className="text-3xl max-w-[200px]  justify-center italic font-lora text-gray-300 flex">
              <span>₦</span>
              <span>{total.totalBalance.toLocaleString()}</span>
            </p>
          </div>
          <div className="gap-3 flex flex-col mt-[10px]">
            {header.map((mTotal, index) => (
              <div
                className="w-[98%] bg-[#4a5f86] p-[30px] rounded rounded-2xl"
                key={index}
              >
                <h5 className="flex items-center gap-1">
                  <span className="text-red-300 text-5xl">{mTotal.icon}</span>
                  <span className="text-white text-sm md:text-base font-bold font-lora">
                    {mTotal.label}
                  </span>
                </h5>
                <p className="text-1xl pl-[10px] italic font-lora text-gray-300 flex ga-2">
                  ₦
                  {(total[mTotal.key as keyof totalData] || 0).toLocaleString()}
                </p>
                <small className="text-xs pl-[10px] italic font-lora text-gray-100">
                  {total.date}
                </small>
              </div>
            ))}
          </div>
        </div>

        {/* Add button */}

        <div className="w-[98%] mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {pageLink.map((page, index) => (
              <Link
                to={page.link}
                className="bg-[#4a5f86] p-[30px] h-[150px] hover:bg-[#2f3f5b] flex flex-col rounded rounded-2xl justify-center items-center"
                key={index}
              >
                <div className="flex flex-col gap-2 justify-center items-center">
                  <span
                    className={`text-white  rounded-2xl p-[10px] text-2xl  ${
                      index === 1
                        ? "bg-red-300"
                        : index === 2
                        ? "bg-blue-300"
                        : index === 3
                        ? "bg-blue-800"
                        : "bg-green-300"
                    }`}
                  >
                    {page.icon}
                  </span>
                  <span className="text-white font-inter italic text-1xl">
                    {page.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div className="w-[98%] p-[20px] h-auto gap-2 rounded rounded-3xl mx-auto bg-[#3b4d6f]">
          <div>
            <h5 className=" flex items-center gap-2 text-white text-sm md:text-1xl font-bold font-lora">
              <span className="bg-green-300 text-white text-2xl p-[10px] rounded-2xl">
                <GoGoal />
              </span>
              <span> Your Goals</span>
            </h5>
          </div>
          <div className="mt-[10px] flex flex-col gap-2">
            {goal.length === 0 ? (
              <p className="text-center text-white font-roboto text-1xl italic">
                No Goal created yet!
              </p>
            ) : (
              [...goal]
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .slice(0, 2)
                .map((g, index) => (
                  <div
                    key={index}
                    className="w-[100%] bg-[#4a5f86] mx-auto py-[30px] px-[20px] rounded rounded-2xl"
                  >
                    <h6 className="text-base italic font-lora text-white">
                      {g.theGoal}
                    </h6>
                    <small className="text-xs italic font-lora text-gray-100">
                      {g.createdAt}
                    </small>
                  </div>
                ))
            )}

            <Link
              className="text-sm text-green-400 flex justify-center items-center font-lora hover:text-green-100 mt-[10px]"
              to="/goal"
            >
              See All Goals
            </Link>
          </div>
        </div>

        {/* expenses */}

        <div className="w-[98%] p-[20px] h-auto gap-2 rounded rounded-3xl mx-auto bg-[#3b4d6f]">
          <div className="">
            <h5 className="flex items-center gap-2 text-white text-sm md:text-1xl font-bold font-lora">
              <span className="bg-red-300 text-white text-2xl p-[10px] rounded-2xl">
                <IoArrowDownCircleOutline />
              </span>
              <span>Recent Expenses</span>
            </h5>
          </div>
          <div className="flex gap-4 flex-col mt-[10px]">
            {expenses.map((item, index) => (
              <div
                className="flex justify-between items-center w-[100%] bg-[#4a5f86] mx-auto py-[30px] px-[20px] rounded rounded-2xl"
                key={index}
              >
                <span>
                  <h6 className="text-2xl italic font-lora text-white">
                    {item.product}
                  </h6>
                  <p className="flex items-center gap-2 text-sm mt-[5px] italic font-lora text-gray-100">
                    <span>
                      <strong className="text-base">Qty:</strong>{" "}
                      {item.quantity}
                    </span>{" "}
                    <span>
                      <small>{item.date}</small>
                    </span>
                  </p>
                </span>
                <span>
                  <p className="text-red-300 text-1xl text-lora italic">
                    - ₦{item.amountSpend.toLocaleString()}
                  </p>
                </span>
              </div>
            ))}
            <Link
              className="text-sm text-green-400 flex justify-center items-center font-lora mt-[10px] hover:text-green-100"
              to="/transactions"
            >
              See All Expenses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
