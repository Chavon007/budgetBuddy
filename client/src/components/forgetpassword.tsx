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
        `https://budgetbuddy-1-a7pb.onrender.com/api/users/forget-password`,
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
      <div className="w-[100%] h-[100vh] flex  ">
        <div className=" w-[100%] lg:w-[50%] flex flex-col h-[60vh] md:[60vh] lg:h-[60vh] mx-auto">
          <h2 className="text-base lg:max-w-[50%] text-center mx-auto font-bartle mt-[80px] lg:mt-[50px] text-gray-500 mb-[10px]">
            BudgetBuddy
          </h2>
          <form
            className="border w-[90%] flex flex-col h-[50vh] mx-auto border-gray-500 p-[10px] "
            onSubmit={handleSubmit}
          >
            <h3 className="text-base lg:max-w-[50%] text-center mx-auto font-lora  font-bold text-gray-500">
              Request for password reset
            </h3>
            <div className="flex flex-col mt-[10px]">
              {error && (
                <p className="font-serif text-red-500 text-xs">{error}</p>
              )}
              {success && (
                <p className="font-serif text-green-500 text-xs">{success}</p>
              )}
              <label className="text-gray-500 font-inter text-base font-bold  mb-[5px] ">
                Email
              </label>
              <input
                className="rounded lg:w-[100%]  rounded-1xl border  text-gray-500 text-xs p-[10px] md:w-[90%] placeholder:text-xs font-sans focus:outline-none"
                type="email"
                value={formData.email}
                placeholder="Enter Your Email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <button
                className="bg-gray-500 w-[30%] my-[5px] p-[8px] text-sm text-gray-300 font-inter mx-auto mt-[30px] hover:bg-gray-900 cursor-pointer"
                type="submit"
                disabled={loading}
              >
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
