
import React, { useState } from "react";
interface loginForm {
  email: string;
  password: string;
}

function Login() {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [formData, setFormData] = useState<loginForm>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill required fields");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch(`https://budgetbuddy-1-a7pb.onrender.com/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setSuccess("Login successful");
      setFormData({ email: "", password: "" });
      setTimeout(() => {
        localStorage.setItem("loggedin", "true");
        window.location.href = "/home";
      }, 1000);

      console.log(data);
    } catch (error) {
      setError("Failed to Login");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto">
      {/* the login form */}
      <div className="flex justify-between w-[100%] h-[100vh]">
        {/* login form */}
        <div className="w-[100%] md:w-[100%] lg:w-[50%] flex flex-col items-center">
          <h2 className="text-base lg:max-w-[50%] text-center mx-auto font-bartle mt-[80px] lg:mt-[50px] text-gray-500">
            Let's keep our financial record
          </h2>
          <form
            className="flex gap-4 border border-gray-500 p-[10px] mt-[50px] lg:mt-[60px] w-[90%] flex-col lg:h-[50vh]"
            onSubmit={handleSubmit}
          >
            <div className="">
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
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="rounded lg:w-[100%] rounded-1xl border text-gray-500 text-xs p-[10px] md:w-[80%] placeholder:text-xs font-sans focus:outline-none "
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className=" text-gray-500 font-inter text-base font-bold "
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="rounded rounded-1xl border text-gray-500 text-xs p-[10px] md:w-[80%] lg:w-[100%] placeholder:text-xs font-sans focus:outline-none "
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
              />
            </div>
            <button
              className="bg-gray-500 w-[30%] p-[8px] text-sm text-gray-300 font-inter mx-auto mt-[30px] hover:bg-gray-900 cursor-pointer"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
        {/* image */}
        <div className="hidden lg:block w-[50%] ">
          <img src="/login.avif" alt="" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
export default Login;
