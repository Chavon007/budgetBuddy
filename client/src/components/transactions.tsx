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
          fetch("http://localhost:5000/api/users/get-income", {
            credentials: "include",
          }),
          fetch("http://localhost:5000/api/users/get-expenses", {
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
    <div>
      <div>
        <ul>
          <li>
            <Link to="/income">Enter Your Income</Link>
          </li>
          <li>
            <Link to="/expenses">Create Expenses</Link>
          </li>
        </ul>
      </div>

      <div>
        <h3>Transaction history</h3>

        <div>
          <h5>Income</h5>
          {income.map((item, index) => (
            <div key={index}>
              <h4>{item.amount}</h4>
              <small>{item.date}</small>
            </div>
          ))}
        </div>

        <div>
          <h5>Expense</h5>
          {expenses.map((item, index) => (
            <div key={index}>
              <h1>{item.product}</h1>
              <p>{item.amountSpend}</p>
              <h6>{item.quantity}</h6>
              <small>{item.date}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
