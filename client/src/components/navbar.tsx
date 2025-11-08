import { Link } from "react-router-dom";

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
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center w-[95%] p-[15px] mx-auto">
        {/* icon */}
        <div>
          <img src="" alt="" />
          <p>BudgetBuddy</p>
        </div>

        {/* nav links */}
        <div className="flex gap-4">
          {navbarLink.map((l, index) => (
            <div key={index}>
              <Link to={l.link}>{l.name}</Link>
            </div>
          ))}
        </div>

        {/* logout */}
        <div>
          <button type="button">Log out</button>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
