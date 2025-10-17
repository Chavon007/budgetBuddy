import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
    <div className="container mx-auto h-[100vh] bg-[#1d283a]">
      <div className="w-[90%] mx-auto h-auto p-[10px] flex flex-col gap-6">
        <div className="w-[50%] mx-auto mt-[40px]">
          <h2 className="text-4xl font-roboto text-white text-center font-bold">
            Transaction Dashboard
          </h2>
          <p className="font-lora text-1xl font-bold text-center text-[#607090]">
            Track your income and expenses
          </p>
        </div>

        <div className="w-[50%] mt-[30px] flex justify-center items-center mx-auto">
          <ul className="flex gap-5">
            <li className="bg-[#06996b] text-white text-xs rounded rounded-1xl transform hover:scale-105 transition duration-300 hover:bg-green-500 font-lora p-[10px]">
              <Link to="/income">Enter Your Income</Link>
            </li>
            <li className="bg-[#e92c52] text-white text-xs rounded rounded-1xl transform hover:scale-105 transition duration-300 hover:bg-red-500 font-lora p-[10px]">
              <Link to="/expenses">Create Expenses</Link>
            </li>
          </ul>
        </div>

        <div className="bg-[#2a3a55] mt-[50px] h-[50vh] rounded rounded-2xl">
          <div className="w-[95%] mx-auto py-[20px]">
            <h3 className="font-roboto font-semibold text-2xl text-white">
              Transaction history
            </h3>

            <div className="flex justify-between gap-3 items-center mt-[20px]">
              <div className="w-[50%]">
                <h5 className="text-[#06996b] text-sm font-bold font-lora">
                  Income
                </h5>
                {income.map((item, index) => (
                  <div
                    className="bg-[#3b4d6f] mt-[10px] rounded rounde-3xl border border-[#4a5e84] p-[15px]"
                    key={index}
                  >
                    <h4 className="font-bold text-2xl text-white font-inter">
                      ₦{item.amount}
                    </h4>
                    <small className="text-xs italic font-lora text-gray-300">{item.date}</small>
                  </div>
                ))}
              </div>

              <div className="w-[50%]">
                <h5 className="text-[#06996b] text-sm font-bold font-lora">Expense</h5>
                {expenses.map((item, index) => (
                  <div className="bg-[#3b4d6f] mt-[10px] rounded rounde-3xl border border-[#4a5e84] p-[15px]" key={index}>
                    <h3 className="font-semibold text-base text-white font-inter">{item.product}</h3>
                    <p className="font-bold text-2xl text-white font-inter">₦{item.amountSpend}</p>
                    <h6 className="text-xs italic font-mons text-gray-300">{item.quantity}</h6>
                    <small className="text-xs italic font-lora text-gray-300">{item.date}</small>
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
