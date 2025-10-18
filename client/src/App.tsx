import "./App.css";
import Login from "./components/login";
import SignUp from "./components/signup";
import Home from "./components/home";
import Transactions from "./components/transactions";
import Income from "./components/income";
import Expenses from "./components/expenses";
import Goal from "./components/goal";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signUp" />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/goal" element={<Goal />} />
      </Routes>
    </Router>
  );
}

export default App;
