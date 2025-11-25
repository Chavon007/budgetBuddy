import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";


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
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/create-income`, {
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
      <div className="flex  flex-col w-[100%] lg:w-[50%] mx-auto h-[100vh]">
        <div className="w-[100%] flex justify-between items-center  mt-[20px] ">
          <div>
            <h3 className="text-2xl font-bold text-center mx-auto font-roboto mt-[10px] lg:mt-[10px] text-gray-500 items-center">
              Add Income
            </h3>
          </div>
          <div className="max-w-[300px] p-[10px]">
            <Link
              className="flex items-center text-gray-400 hover:text-gray-200 font-lora text-1xl italic gap-1"
              to="/transactions"
            >
              <span>
                <IoIosArrowRoundBack/>
              </span>
              <span>Back</span>
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center h-[60vh]">
          <form
            className="flex  gap-4 border border-gray-500 p-[10px] mt-[10px] lg:mt-[10px] w-[90%] mx-auto flex-col lg:h-[50vh]"
            onSubmit={handleSubmit}
          >
            <div>
              {error && (
                <p className="font-serif text-red-500 text-xs">{error}</p>
              )}
              {success && (
                <p className="font-serif text-green-500 text-xs">{success}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 font-lora text-base font-bold">
                Income
              </label>
              <input
                className="rounded lg:w-[100%] rounded-1xl border text-gray-500 text-xs p-[10px] md:w-[80%] placeholder:text-xs font-sans focus:outline-none"
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormdata({ ...formData, amount: Number(e.target.value) })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-gray-500 font-lora text-base font-bold"
                htmlFor=""
              >
                Date
              </label>
              <input
                className="rounded lg:w-[100%] rounded-1xl border text-gray-500 text-xs p-[10px] md:w-[80%] placeholder:text-xs font-sans focus:outline-none"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormdata({ ...formData, date: e.target.value })
                }
                placeholder="Enter Date"
              />
            </div>

            <button
              className="bg-gray-500 w-[30%] p-[8px] text-sm text-gray-300 font-inter mx-auto mt-[30px] hover:bg-gray-900 cursor-pointer"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Income;
