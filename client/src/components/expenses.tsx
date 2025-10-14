import React, { useState } from "react";

interface expensesFormData {
  amountSpend: number;
  product: string;
  date: string;
  quantity: number;
}

function Expenses() {
  const [formData, setFormData] = useState<expensesFormData>({
    amountSpend: 0,
    product: "",
    date: "",
    quantity: 0,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.amountSpend ||
      !formData.date ||
      !formData.quantity ||
      !formData.product.trim()
    ) {
      setError("Please fill all fields");
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
        setError("can't add expenses now");
        return;
      }
      const data = await res.json();
      setSuccess("Expenses added Successfully");
      setFormData({
        amountSpend: 0,
        date: "",
        quantity: 0,
        product: "",
      });
      console.log(data);
    } catch (err) {
      setError("Failed to add Expenses");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex  flex-col w-[100%] lg:w-[50%] mx-auto h-[100vh]">
        <div className="w-[100%]  mt-[20px] ">
          <h3 className="text-2xl font-bold lg:max-w-[50%] text-center mx-auto font-roboto mt-[10px] lg:mt-[10px] text-gray-500 items-center">
            Add Expenses
          </h3>
        </div>
        <div className="flex justify-center items-center h-[60vh]">
          <form
            className="flex  gap-4 border border-gray-500 p-[10px] mt-[10px] lg:mt-[10px] w-[90%] mx-auto flex-col lg:h-auto"
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
                Product bought
              </label>
              <input
                className="rounded lg:w-[100%] rounded-1xl border text-gray-500 text-xs p-[10px] md:w-[80%] placeholder:text-xs font-sans focus:outline-none"
                type="text"
                value={formData.product}
                onChange={(e) =>
                  setFormData({ ...formData, product: e.target.value })
                }
                placeholder="Enter Product Name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-500 font-lora text-base font-bold">
                Amount spent
              </label>
              <input
                className="rounded lg:w-[100%] rounded-1xl border text-gray-500 text-xs p-[10px] md:w-[80%] placeholder:text-xs font-sans focus:outline-none"
                type="number"
                value={formData.amountSpend}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amountSpend: Number(e.target.value),
                  })
                }
                placeholder="Enter product price"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-500 font-lora text-base font-bold">
                Product Quantity
              </label>
              <input
                className="rounded lg:w-[100%] rounded-1xl border text-gray-500 text-xs p-[10px] md:w-[80%] placeholder:text-xs font-sans focus:outline-none"
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: Number(e.target.value) })
                }
                placeholder="Enter Product Quantity"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-500 font-lora text-base font-bold">
                Date
              </label>
              <input
                className="rounded lg:w-[100%] rounded-1xl border text-gray-500 text-xs p-[10px] md:w-[80%] placeholder:text-xs font-sans focus:outline-none"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            <button
              className="bg-gray-500 w-[30%] p-[8px] text-sm text-gray-300 font-inter mx-auto mt-[30px] hover:bg-gray-900 cursor-pointer"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Expenses;
