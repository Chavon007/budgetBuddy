import { Link } from "react-router-dom";
function Transactions() {
  return (
    <div>
      <div>
        <ul>
          <li>
            <Link to="/income">Enter Your Income</Link>
          </li>
          <li>
            <Link to="/expenses">Create Expenses</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Transactions;
