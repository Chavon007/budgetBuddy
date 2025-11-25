
import React, { useState } from "react";

interface signupForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;

  confirmedPassword: string;
}
function SignUp() {
  const [formData, setFormData] = useState<signupForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    confirmedPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.password ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone
    ) {
      setError("Please fill all fields");
      return;
    }
    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(formData.password)) {
      setError(
        "Password must be at least 8 characters long, contain one uppercase letter, and one special symbol"
      );
      return;
    }
    if (formData.password !== formData.confirmedPassword) {
      setError("Password does not match");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("please use a vaaild email address");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/users/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        setError("Failed to signup");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setSuccess("Signup Successful");
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        confirmedPassword: "",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
      console.log(data);
    } catch (error) {
      setError("Can't sign-up");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="flex justify-between w-[100%] h-[110vh]">
        <div className="w-[100%] md:w-[100%] lg:w-[50%] flex flex-col items-center">
          <h3 className="text-base lg:max-w-[50%] text-center mx-auto font-bartle mt-[50px] lg:mt-[10px] text-gray-500">
            BudgetBuddy
          </h3>
          <p className="text-sm">
            Already have an account?{" "}
            <span>
              <a
                className="text-xs italic text-blue-300 hover:text-blue-600 cursor-pointer"
                href="/login"
              >
                Login here
              </a>
            </span>
          </p>
          <form
            className="flex gap-2 border border-gray-500 p-[10px]  mt-[50px] lg:mt-[10px] w-[90%] mx-autos flex-col lg:h-auto lg:mb-[80px]"
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
              <label
                className="text-gray-500 font-inter text-base font-bold"
                htmlFor="name"
              >
                First Name
              </label>
              <input
                className="rounded lg:w-[100%] rounded-1xl border text-gray-500 text-xs p-[10px] md:w-[80%] placeholder:text-xs font-sans focus:outline-none"
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                placeholder="Enter your First Name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-gray-500 font-inter text-base font-bold"
                htmlFor="name"
              >
                Last Name
              </label>
              <input
                className="rounded lg:w-[100%] rounded-1xl border text-gray-500 text-xs p-[10px] md:w-[80%] placeholder:text-xs font-sans focus:outline-none"
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                placeholder="Enter Your Last name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-gray-500 font-inter text-base font-bold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="rounded lg:w-[100%] rounded-1xl border text-gray-500 text-xs p-[10px] md:w-[80%] placeholder:text-xs font-sans focus:outline-none"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter Your Email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-gray-500 font-inter text-base font-bold"
                htmlFor="number"
              >
                Phone Number
              </label>
              <input
                className="rounded lg:w-[100%] rounded-1xl border text-gray-500 text-xs p-[10px] md:w-[80%] placeholder:text-xs font-sans focus:outline-none"
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Enter Your Phone Number"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-gray-500 font-inter text-base font-bold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="rounded lg:w-[100%] rounded-1xl border text-gray-500 text-xs p-[10px] md:w-[80%] placeholder:text-xs font-sans focus:outline-none"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter Password"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-gray-500 font-inter text-base font-bold"
                htmlFor="password"
              >
                Confirm Password
              </label>
              <input
                className="rounded lg:w-[100%] rounded-1xl border text-gray-500 text-xs p-[10px] md:w-[80%] placeholder:text-xs font-sans focus:outline-none"
                type="password"
                value={formData.confirmedPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmedPassword: e.target.value,
                  })
                }
                placeholder="Confirm Your Password"
              />
            </div>

            <button
              className="bg-gray-500 w-[30%] p-[8px] text-sm text-gray-300 font-inter mx-auto mt-[30px] hover:bg-gray-900 cursor-pointer"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing up" : "Sign Up"}
            </button>
          </form>
        </div>

        {/* sign upp image */}
        <div className="hidden lg:block w-[50%]">
          <img src="/signUp.avif" alt="" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
export default SignUp;
