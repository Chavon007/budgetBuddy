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
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
          </div>

          <div>
            <label>Product bought</label>
            <input
              type="text"
              value={formData.product}
              onChange={(e) =>
                setFormData({ ...formData, product: e.target.value })
              }
              placeholder="Enter Product Name"
            />
          </div>

          <div>
            <label>Amount spent</label>
            <input
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

          <div>
            <label>Product Quantity</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: Number(e.target.value) })
              }
              placeholder="Enter Product Quantity"
            />
          </div>

          <div>
            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>

          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default Expenses;
