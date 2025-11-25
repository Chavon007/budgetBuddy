import { Link } from "react-router-dom";
import { FaNairaSign } from "react-icons/fa6";
function Footer() {
  return (
    <div className="container mx-auto">
      <div className="bg-[#1d283a] w-[100%] h-auto pb-[10px]">
        <div className="px-[20px] pt-[20px] flex flex-col gap-3">
          {/*  */}
          <div className="w-[80%] md:w-[50%] flex flex-col gap-1">
            <h2 className="flex items-center gap-2">
              <span className="bg-gray-300 text-green-500 p-[10px] text-1xl rounded rounded-1xl">
                <FaNairaSign />
              </span>
              <span className="text-base md:text-base lg:text-2xl  tracking-[2px] font-roboto text-white font-bold">
                BudgetBuddy
              </span>
            </h2>
            <p className="w-[100%] lg:w-[70%] font-lora text-xs md:text-sm italic tracking-[2px] text-gray-200">
              Your trusted companion for financial success.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-base tracking-[2px] font-roboto text-white font-bold">
              Services
            </h2>
            <Link
              className="text-xs font-lora text-gray-100 max-w-[20px] hover:text-gray-600"
              to="/income"
            >
              Income
            </Link>
            <Link
              className="text-xs font-lora text-gray-100 max-w-[20px] hover:text-gray-600"
              to="/expenses"
            >
              Expenses
            </Link>
            <Link
              className="text-xs font-lora max-w-[20px] text-gray-100 hover:text-gray-600"
              to="/goal"
            >
              Goal
            </Link>
            <Link
              className="text-xs max-w-[20px] font-lora text-gray-100 hover:text-gray-600"
              to="/analysis"
            >
              Analysis
            </Link>
            <Link
              className="text-xs max-w-[20px] font-lora text-gray-100 hover:text-gray-600"
              to="/profile"
            >
              Profile
            </Link>
          </div>

          <div className="text-center text-gray-500 font-lora">
            <p>&copy; 2025 BudgetBuddy. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
