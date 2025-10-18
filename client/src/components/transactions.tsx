import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoTrendingUpOutline } from "react-icons/io5";
import { IoTrendingDownOutline } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { FaNairaSign } from "react-icons/fa6";
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
function Transactions() {
  const [income, setIncome] = useState<incomeIformation[]>([]);
  const [expenses, setExpenses] = useState<expensesInformation[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeRes, expensesRes] = await Promise.all([
          fetch("http://localhost:5000/api/get-income", {
            credentials: "include",
          }),
          fetch("http://localhost:5000/api/get-expenses", {
            credentials: "include",
          }),
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
  }, []);

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="container mx-auto h-[120vh] bg-[#1d283a]">
      <div className="w-[100%] md:w-[90%] mx-auto h-auto p-[10px] flex flex-col gap-6">
        <div className="w-[100%] lg:w-[50%] lg:mx-auto mt-[40px]">
          <h2 className=" text-2xl lg:text-4xl font-roboto text-white text-center font-bold">
            Transaction Dashboard
          </h2>
          <p className="font-lora text-sm lg:text-1xl font-bold text-center text-[#607090]">
            Track your income and expenses
          </p>
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

        <div className="bg-[#2a3a55] mt-[50px] h-[70vh] rounded rounded-2xl">
          <div className=" w-[100%] md:w-[95%] md:mx-auto px-[10px] py-[20px]">
            <h3 className="font-roboto font-semibold text-2xl text-white">
              Transaction history
            </h3>

            <div className="flex justify-between gap-3 items-center h-auto mt-[10px]">
              <div className="w-[50%]">
                <h5 className="text-[#06996b] flex items-center gap-2 text-1xl font-bold font-lora">
                  <span className="font-bold text-2xl bg-teal-800 p-[5px] rounded rounded-1xl">
                    <IoTrendingUpOutline />
                  </span>{" "}
                  <span>Income</span>
                </h5>
                {income.map((item, index) => (
                  <div
                    className="bg-[#3b4d6f] mt-[10px] rounded rounde-3xl border border-[#4a5e84] p-[15px] flex items-center justify-between"
                    key={index}
                  >
                    <div>
                      <h4 className="text-white flex items-center gap-2 text-1xl font-bold font-lora">
                        ₦{item.amount}
                      </h4>
                      <small className="text-xs italic font-lora text-gray-300">
                        {item.date}
                      </small>
                    </div>
                    <div className="bg-teal-800 text-[#06996b] p-[10px] rounded rounded-2xl">
                      <FaNairaSign />
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-[50%]">
                <h5 className="text-[#ba3853] mt-[35px] flex items-center gap-2 text-1xl font-bold font-lora">
                  <span className="font-bold text-2xl bg-[#492e42] p-[5px] rounded rounded-1xl">
                    <IoCart />
                  </span>
                  <span> Expenses</span>
                </h5>
                {expenses.map((item, index) => (
                  <div
                    className="bg-[#3b4d6f] mt-[10px] rounded rounde-3xl border border-[#4a5e84] p-[15px] flex items-center justify-between gap-3"
                    key={index}
                  >
                    <div>
                      <h3 className="flex gap-2 items-center">
                        <span className="font-lora text-base text-red-300">
                          Product:
                        </span>
                        <span className="font-inter text-1xl italic text-gray-300">
                          {item.product}
                        </span>
                      </h3>
                      <p className="flex gap-2 items-center">
                        <span className="font-lora text-sm text-red-300">
                          Amount:
                        </span>
                        <span className="font-inter text-sm italic text-gray-300">
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
                          {item.date}
                        </span>
                      </small>
                    </div>
                    <div className="text-[#ba3853] font-bold text-2xl bg-[#492e42] p-[5px] rounded rounded-1xl">
                      <span className="">
                        <IoCart />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
