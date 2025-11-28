import React, { useState } from "react";

interface resetPassword {
  password: string;
  confirmedPassword: string;
}

const token = new URLSearchParams(window.location.search).get("token");

function Resetpassword() {
  const [formData, setFormData] = useState<resetPassword>({
    password: "",
    confirmedPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.password || !formData.confirmedPassword) {
      setError("Please fill all required fields");
      return;
    }

    if (formData.password !== formData.confirmedPassword) {
      setError("Confirmed password and password does not match");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(
        `https://budgetbuddy-1-a7pb.onrender.com/api/users/reset-password?token=${token}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to set new password");
      }

      setSuccess(data.message || "New password set successfully");
      setFormData({ confirmedPassword: "", password: "" });
    } catch (error) {
      setError("failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto">
      <div className=" w-[100%] h-[100vh] flex justify-center mt-[20px] ">
        <div className=" w-[98%] lg:w-[80%] mx-auto flex flex-col h-[80vh] justify-center">
          <div className=" w-[40%] mx-auto flex justify-center p-[10px]">
            <h2 className="text-base font-bartletext-gray-500 ">BudgetBuddy</h2>
          </div>
          <div className="mt-[10px] p-[20px] border w-[90%] lg:w-[50%] lg:h-[60vh] mx-auto border-gray-500">
            <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
              <div className="flex justify-center items-center p-[5px]">
                <h4 className=" text-gray-500 text-base lg:max-w-[50%] text-center mx-auto font-lora  font-bold ">
                  Set New Password
                </h4>
              </div>
              <div className="flex flex-col mt-[10px]">
                {error && (
                  <p className="font-serif text-red-500 text-xs">{error}</p>
                )}
                {success && (
                  <p className="font-serif text-green-500 text-xs">{success}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-gray-500 font-inter text-base font-bold"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="rounded lg:w-[100%]  rounded-1xl border  text-gray-500 text-xs p-[10px] md:w-[90%] placeholder:text-xs font-sans focus:outline-none"
                  type="password"
                  value={formData.password}
                  placeholder="Enter new password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <label
                  htmlFor="confirmPassword"
                  className="text-gray-500 font-inter text-base font-bold"
                >
                  Confirm Password
                </label>
                <input
                  className="rounded lg:w-[100%]  rounded-1xl border  text-gray-500 text-xs p-[10px] md:w-[90%] placeholder:text-xs font-sans focus:outline-none"
                  type="password"
                  placeholder="Confirm password"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmedPassword: e.target.value,
                    })
                  }
                />

                <button
                  className="bg-gray-500 w-[30%] p-[8px] text-sm text-gray-300 font-inter mx-auto mt-[30px] hover:bg-gray-900 cursor-pointer"
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
    </div>
  );
}

export default Resetpassword;
