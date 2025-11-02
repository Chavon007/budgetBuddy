import { useState, useEffect } from "react";
import { FaRegHandPeace } from "react-icons/fa";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { GrAnalytics } from "react-icons/gr";
import { GoGoal } from "react-icons/go";
import { Link } from "react-router-dom";
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

  const getGoals = async () => {
    try {
      const goals = await fetch("http://localhost:5000/api/get-goals", {
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
        "http://localhost:5000/api/get-expenses",
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
      <div className="w-[100%] md:w-[90%] mx-auto h-auto p-[10px] flex flex-col gap-6">
        <div className="w-[100%] lg:w-[50%] lg:mx-auto mt-[40px]">
          <h2 className="text-1xl flex items-center gap-2 justify-center lg:text-4xl font-roboto text-white text-center font-bold">
            <span>Welcome back!</span>
            <span className="text-green-500">
              <FaRegHandPeace />
            </span>
          </h2>
          <p className="font-lora text-sm lg:text-1xl font-bold text-center text-[#607090]">
            Here's your financial overview
          </p>
        </div>
        {/* baalance */}
        <div className="w-[95%] p-[20px] gap-2 rounded rounded-3xl mx-auto bg-[#3b4d6f]">
          <div className="">
            <h4 className="text-white text-sm md:text-1xl font-bold font-lora">
              Current Balance
            </h4>
            <p className="text-base pl-[10px] italic font-lora text-gray-300 flex gap-2">
              <span>₦</span>
              <span>{total.totalBalance.toLocaleString()}</span>
            </p>
          </div>
          <div className="flex justify-between gap-3 items-center  mt-[10px]">
            {header.map((mTotal, index) => (
              <div
                className="w-[45%] bg-[#4a5f86] p-[10px] rounded rounded-2xl"
                key={index}
              >
                <h5 className="flex items-center gap-1">
                  <span className="text-green-500">{mTotal.icon}</span>
                  <span className="text-white text-sm md:text-1xl font-bold font-lora">
                    {mTotal.label}
                  </span>
                </h5>
                <p className="text-base pl-[10px] italic font-lora text-gray-300 flex ga-2">
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

        {/* Goals */}
        <div className="w-[95%] p-[20px] h-auto gap-2 rounded rounded-3xl mx-auto bg-[#3b4d6f]">
          <div>
            <h5 className="text-white text-sm md:text-1xl font-bold font-lora">
              Your Goals
            </h5>
          </div>
          <div className="mt-[10px] flex-col gap-2">
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
                  <div key={index}>
                    <h6 className="text-base italic font-lora text-white">
                      {g.theGoal}
                    </h6>
                    <small className="text-xs  italic font-lora text-gray-100">
                      {new Date(g.createdAt).toLocaleString()}
                    </small>
                  </div>
                ))
            )}
            <Link
              className="text-sm text-green-400 flex justify-center items-center font-lora hover:text-green-100"
              to="/goal"
            >
              See All Goals
            </Link>
          </div>
        </div>

        {/* expenses */}

        <div className="w-[95%] p-[20px] h-auto gap-2 rounded rounded-3xl mx-auto bg-[#3b4d6f]">
          <div>
            <h5 className="text-white text-sm md:text-1xl font-bold font-lora">
              Recent Expenses
            </h5>
          </div>
          <div className="flex-col gap-2 mt-[10px]">
            {expenses.map((item, index) => (
              <div
                className="flex justify-between items-center w-[90%] bg-[#4a5f86] mx-auto py-[30px] px-[20px] rounded rounded-2xl"
                key={index}
              >
                <span>
                  <h6 className="text-base italic font-lora text-white">
                    {item.product}
                  </h6>
                  <p className="flex gap-1 text-xs  italic font-lora text-gray-100">
                    <span>{item.quantity}</span>{" "}
                    <span>
                      <small>{new Date(item.date).toLocaleString()}</small>
                    </span>
                  </p>
                </span>
                <span>
                  <p className="text-red-300 text-sm text-lora italic">
                    ₦{item.amountSpend.toLocaleString()}
                  </p>
                </span>
              </div>
            ))}
            <Link
              className="text-sm text-green-400 flex justify-center items-center font-lora mt-[10px] hover:text-green-100"
              to="/expenses"
            >
              See All Expenses
            </Link>
          </div>
        </div>

        <div className="w-[90%] mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {pageLink.map((page, index) => (
              <Link to={page.link}
                className="bg-[#4a5f86] p-[30px] h-[150px] hover:bg-[#2f3f5b] flex flex-col rounded rounded-1xl justify-center items-center"
                key={index}
              >
                <div
                  className="flex flex-col justify-center items-center"
                  
                >
                  <span className="text-green-500 text-2xl">{page.icon}</span>
                  <span className="text-white font-inter italic text-xs md:text-1xl">
                    {page.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
