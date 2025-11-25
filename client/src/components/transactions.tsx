import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoTrendingUpOutline } from "react-icons/io5";
import { IoTrendingDownOutline } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { FaNairaSign } from "react-icons/fa6";
import Back from "./back";

interface incomeIformation {
  amount: number;
  date: string;
}

interface expensesInformation {
  amountSpend: number;
  product: string;
  date: string;
  quantity: number;
}

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;
function Transactions() {
  const [income, setIncome] = useState<incomeIformation[]>([]);
  const [expenses, setExpenses] = useState<expensesInformation[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeRes, expensesRes] = await Promise.all([
          fetch(
            `https://budgetbuddy-1-a7pb.onrender.com/api/monthly-income?month=${month}&year=${year}`,
            {
              credentials: "include",
            }
          ),
          fetch(
            `https://budgetbuddy-1-a7pb.onrender.com/api/monthly-expenses?month=${month}&year=${year}`,
            {
              credentials: "include",
            }
          ),
        ]);

        if (!incomeRes.ok || !expensesRes.ok) {
          const incomeError = await incomeRes.text();
          const expensesError = await expensesRes.text();
          console.log("Income error:", incomeError);
          console.log("Expenses error:", expensesError);
          throw new Error("Failed to fetch income or expenses");
        }

        const incomeData = await incomeRes.json();
        const expensesData = await expensesRes.json();

        // Extract the data property from the response
        setIncome(incomeData.data || []);
        setExpenses(expensesData.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to connect");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month, year]);

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="container mx-auto h-auto bg-[#1d283a]">
      <div className="w-[100%] md:w-[98%] mx-auto h-auto p-[10px] flex flex-col gap-6">
        <div className="w-[100%] flex justify-between items-center  mt-[40px]">
          <div>
            <h2 className="text-base lg:text-3xl font-roboto text-white font-bold">
              Transaction Dashboard
            </h2>
            <p className="font-lora   text-xs lg:text-1xl pl-[5px] text-[#607090]">
              Track your income and expenses
            </p>
          </div>

          <div className="">
            <Back />
          </div>
        </div>

        <div className="w-[100%] lg:w-[50%] mt-[30px] flex justify-center items-center mx-auto">
          <ul className="flex gap-5">
            <li className="bg-[#06996b]  text-white text-xs rounded rounded-1xl transform hover:scale-105 transition duration-300 hover:bg-green-500 font-lora p-[10px] max-w-[300px]">
              <Link className="flex items-center gap-2" to="/income">
                <span className="font-bold text-2xl">
                  <IoTrendingUpOutline />
                </span>
                <span>Enter Your Income</span>
              </Link>
            </li>
            <li className="bg-[#e92c52] text-white text-xs rounded rounded-1xl transform hover:scale-105 transition duration-300 hover:bg-red-500 font-lora p-[10px]">
              <Link className="flex items-center gap-2" to="/expenses">
                <span className="font-bold text-2xl">
                  <IoTrendingDownOutline />
                </span>{" "}
                Create Expenses
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-[100%] md:w-[95%] md:mx-auto px-[10px] py-[20px] flex flex-col h-[70vh]">
          <h3 className="font-roboto font-semibold text-2xl text-white mb-4">
            Transaction History
          </h3>

          {/* Month/Year selectors */}
          <div className="mb-4 flex gap-3">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="p-2 rounded text-gray-200"
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
              className="p-2 rounded text-gray-200"
            >
              {Array.from({ length: 5 }, (_, i) => currentYear - i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Income & Expenses Lists */}
          <div className="flex gap-3 flex-1 overflow-hidden">
            {/* Income */}
            <div className="w-[50%] flex flex-col h-full">
              <h5 className="text-[#06996b] flex items-center gap-2 text-1xl font-bold font-lora mb-2">
                <span className="font-bold text-2xl bg-green-500 p-[5px] text-white rounded rounded-1xl">
                  <IoTrendingUpOutline />
                </span>
                Income
              </h5>
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-[#1d283a]">
                {income.length === 0 ? (
                  <p className="flex justify-center items-center mt-[20px] text-gray-200 italic">
                    No income for this month.
                  </p>
                ) : (
                  income.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#3b4d6f] rounded border border-[#4a5e84] p-[15px] flex items-center justify-between hover:scale-101 transform transition duration-300 hover:border-[#06996b] hover:border-[2px]"
                    >
                      <div>
                        <h4 className="text-white flex items-center gap-2 text-1xl font-bold font-lora">
                          ₦{item.amount}
                        </h4>
                        <small className="text-xs italic font-lora text-gray-300">
                          {new Date(item.date).toLocaleDateString()}
                        </small>
                      </div>
                      <div className="bg-teal-800 text-[#06996b] p-[10px] text-white rounded rounded-2xl">
                        <FaNairaSign />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Expenses */}
            <div className="w-[60%] md:w-[50%] flex flex-col h-full">
              <h5 className="text-[#ba3853] flex items-center gap-2 text-1xl font-bold font-lora mb-2">
                <span className="font-bold text-white text-2xl bg-red-500 p-[5px] rounded rounded-1xl">
                  <IoCart />
                </span>
                Expenses
              </h5>
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-[#1d283a]">
                {expenses.length === 0 ? (
                  <p className="flex justify-center items-center mt-[20px] text-gray-200 italic">
                    No expenses for this month.
                  </p>
                ) : (
                  expenses.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#3b4d6f]  rounded border border-[#4a5e84] p-[15px] flex items-center justify-between gap-3 hover:scale-101 transform transition duration-300 hover:border-[#ba3853] hover:border-[2px]"
                    >
                      <div className=" max-w-[300px]">
                        <h3 className="flex gap-2 items-center">
                          <span className="font-lora text-xs md:text-base text-red-300">
                            Product:
                          </span>
                          <span className="font-inter text-xs  md:text-1xl italic text-white">
                            {item.product}
                          </span>
                        </h3>
                        <p className="flex gap-2 items-center">
                          <span className="font-lora text-sm text-red-300">
                            Amount:
                          </span>
                          <span className="font-inter text-sm italic text-white">
                            ₦{item.amountSpend}
                          </span>
                        </p>
                        <h6 className="flex gap-2 items-center">
                          <span className="font-lora text-xs text-red-300">
                            Qty:
                          </span>
                          <span className="font-inter text-xs italic text-gray-300">
                            {item.quantity}
                          </span>
                        </h6>
                        <small className="flex gap-2 items-center">
                          <span className="font-lora text-xs text-red-300">
                            Date:
                          </span>
                          <span className="font-inter text-xs italic text-gray-300">
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </small>
                      </div>
                      <div className=" hidden  md:block text-[#ba3853] font-bold text-2xl bg-[#492e42] p-[5px] rounded rounded-1xl">
                        <span className="text-white">
                          <IoCart />
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
