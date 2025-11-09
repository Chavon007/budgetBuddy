import { Link } from "react-router-dom";
import { FaNairaSign } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
const navbarLink = [
  {
    link: "/dashboard",
    name: "Dashboard",
  },
  {
    link: "/transactions",
    name: "Transactions",
  },
  {
    link: "/analysis",
    name: "Analytics",
  },
  {
    link: "/goal",
    name: "Goal",
  },
  {
    link: "/profile",
    name: "Profile",
  },
];
function Navbar() {
  const [menu, setMenu] = useState(false);
  return (
    <div className="container mx-auto">
      <div className="flex justify-between  items-center w-[95%] p-[15px] mx-auto">
        {/* icon */}
        <div className="">
          <h2 className="flex gap-2 items-center">
            <span className="bg-gray-100 text-green-500 p-[10px] text-2xl rounded rounded-1xl">
              <FaNairaSign />
            </span>{" "}
            <span className="font-bartle font-bold text-xs text-gray-500">
              BudgetBuddy
            </span>{" "}
          </h2>
        </div>

        {/* nav links */}
        <div className="hidden lg:flex justify-between w-[60%] items-center">
          <div className="flex gap-4">
            {navbarLink.map((l, index) => (
              <div className="p-[8px]" key={index}>
                <Link
                  className="text-gray-800  font-lora hover:text-gray-400"
                  to={l.link}
                >
                  {l.name}
                </Link>
              </div>
            ))}
          </div>

          {/* logout */}
          <div className="hidden lg:block bg-gray-50 w-[100px] text-center p-[10px] font-roboto text-gray-500 font-bold hover:bg-gray-300 hover:text-white rounded rounded-1xl cursor-pointer">
            <button className="cursor-pointer" type="button">
              Log out
            </button>
          </div>
        </div>

        {/* menu */}
        <div
          className="lg:hidden text-3xl text-gray-500 z-[60] relative"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <IoClose className="text-white" /> : <IoMdMenu />}
        </div>

        {/* Mobile menu */}
        {menu && (
          <div className="lg:hidden fixed inset-0 bg-[#1d283a] flex flex-col justify-center items-center gap-4 z-50 ">
            {navbarLink.map((l, index) => (
              <div key={index}>
                <Link
                  onClick={() => setMenu(false)}
                  className="text-white  font-lora hover:text-gray-400"
                  to={l.link}
                >
                  {l.name}
                </Link>
              </div>
            ))}

            {/* logout */}
            <div className=" p-[10px] font-roboto text-white font-bold hover:bg-gray-300 hover:text-white rounded rounded-1xl cursor-pointer">
              <button
                className="cursor-pointer"
                onClick={() => setMenu(false)}
                type="button"
              >
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar;
