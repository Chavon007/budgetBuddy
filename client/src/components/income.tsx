import { useState } from "react";

interface incomeData {
  amount: number;
  date: string;
}
function Income() {
  const [formData, setFormdata] = useState<incomeData>({
    amount: 0,
    date: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.amount || !formData.date) {
      setError("Please filled required field");
      return;
    }
    setError("");
    setSuccess("");

    try {
      const res = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        setError("Can't send data now");
        return;
      }
      const data = await res.json();
      setSuccess("Income Updated");
      setFormdata({
        amount: 0,
        date: "",
      });
      console.log(data);
    } catch (err) {
      setError("Can't Add Income");
    }
  };
  return (
    <div className="container mx-auto">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
          </div>
          <div>
            <label>Income</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormdata({ ...formData, amount: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label htmlFor="">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormdata({ ...formData, date: e.target.value })
              }
              placeholder="Enter Date"
            />
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
export default Income;
