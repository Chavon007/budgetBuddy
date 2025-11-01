import { useState, useEffect } from "react";
import { FaRegHandPeace } from "react-icons/fa";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { IoArrowDownCircleOutline } from "react-icons/io5";
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

function Dashboard() {
  const [total, setTotal] = useState<totalData>({
    totalIncome: 0,
    totalBalance: 0,
    totalExpenses: 0,
    date: "",
  });

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
  useEffect(() => {
    totalData();
    getGoals();
  }, []);
  return (
    <div className="container mx-auto">
      <div>
        <div>
          <h2>
            <span>Welcome back!</span>
            <span>
              <FaRegHandPeace />
            </span>
          </h2>
          <p>Here's your financial overview</p>
        </div>
        {/* baalance */}
        <div>
          <div>
            <h4>Current Balance</h4>
            <p>
              <span>₦</span>
              <span>{total.totalBalance}</span>
            </p>
          </div>
          <div>
            {header.map((mTotal, index) => (
              <div key={index}>
                <h5>
                  <span>{mTotal.icon}</span>
                  <span>{mTotal.label}</span>
                </h5>
                <p>
                  ₦
                  {(total[mTotal.key as keyof totalData] || 0).toLocaleString()}
                </p>
                <small>{total.date}</small>
              </div>
            ))}
          </div>
        </div>

        {/* Goals */}

        <div></div>
      </div>
    </div>
  );
}
export default Dashboard;
