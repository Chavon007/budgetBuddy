import "./App.css";
import Login from "./components/login";
import SignUp from "./components/signup";
import Home from "./components/home";
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
        {/* <Route path="" element={} /> */}
      </Routes>
    </Router>
  );
}

export default App;
