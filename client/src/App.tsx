import "./App.css";
import Login from "./components/login";
import SignUp from "./components/signup";
import Home from "./components/home";
import Transactions from "./components/transactions";
import Income from "./components/income";
import Expenses from "./components/expenses";
import Goal from "./components/goal";
import Profile from "./components/profile";
import Dashboard from "./components/dashboard";
import ExpensesAnalytics from "./components/analytic";
import Protect from "./components/protectedRoutes";
import Authentication from "./hook/auth";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  const isAuthenticated = Authentication();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signUp" />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <Protect isAuthenticated={isAuthenticated}>
              <Home />
            </Protect>
          }
        />
        <Route
          path="/transactions"
          element={
            <Protect isAuthenticated={isAuthenticated}>
              <Transactions />
            </Protect>
          }
        />
        <Route
          path="/income"
          element={
            <Protect isAuthenticated={isAuthenticated}>
              <Income />
            </Protect>
          }
        />
        <Route
          path="/expenses"
          element={
            <Protect isAuthenticated={isAuthenticated}>
              <Expenses />
            </Protect>
          }
        />
        <Route
          path="/goal"
          element={
            <Protect isAuthenticated={isAuthenticated}>
              <Goal />
            </Protect>
          }
        />
        <Route
          path="/profile"
          element={
            <Protect isAuthenticated={isAuthenticated}>
              <Profile />
            </Protect>
          }
        />
        <Route
          path="/analysis"
          element={
            <Protect isAuthenticated={isAuthenticated}>
              <ExpensesAnalytics />
            </Protect>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Protect isAuthenticated={isAuthenticated}>
              <Dashboard />
            </Protect>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
