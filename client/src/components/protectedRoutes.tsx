import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface protectedPages {
  children: JSX.Element;
  isAuthenticated: Boolean | null;
}

function Protect({ children, isAuthenticated }: protectedPages) {
  if (isAuthenticated === null) {
    return <div>Loading....</div>;
  }
  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default Protect;
