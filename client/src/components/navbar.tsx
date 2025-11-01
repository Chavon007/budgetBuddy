import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="container mx-auto">
      <div>
        {/* icon */}
        <div>
          <img src="" alt="" />
          <p>BudgetBuddy</p>
        </div>

        {/* nav links */}
        <div>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/transactions">Transactions</Link>
            </li>
            <li>
              <Link to="/analysis">Analytics</Link>
            </li>
            <li>
              <Link to="/goal">Goals</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
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
