import React, { useState } from "react";

interface forgetpassword {
  email: string;
}

function Forgetpassword() {
  const [formData, setFormData] = useState<forgetpassword>({
    email: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      setError("Email can't be empty");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(
        `https://budgetbuddy-1-a7pb.onrender.com/api/forget-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!res.ok) {
        setError("Can't send link for reset Password");
        return;
      }
      const data = await res.json();
      setSuccess("Password reset link sent");
      setFormData({ email: "" });

      console.log(data);
    } catch (error) {
      setError("Can't send email");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="w-[100%] h-[100vh]">
        <div className="w-[80%] bg-red-100 flex justify-center items-center h-[80vh] mx-auto">
          <form
            className="border w-[90%] mx-auto border-gray-500 p-[10px] "
            onSubmit={handleSubmit}
          >
            <h3>Request for password reset</h3>
            <div className="flex flex-col">
              {error && <p>{error}</p>}
              {success && <p>{success}</p>}
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                placeholder="Enter Your Email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Forgetpassword;
