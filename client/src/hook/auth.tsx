import { useState, useEffect } from "react";

function Authentication() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const justloggedin = localStorage.getItem("loggedin") === "true";

    const auth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/profile", {
          credentials: "include",
        });
        setIsAuthenticated(res.ok);
      } catch (error) {
        setIsAuthenticated(false);
      }

      if (justloggedin) {
        localStorage.removeItem("loggedin");
      }
    };

    auth();
  }, []);

  return isAuthenticated;
}

export default Authentication;
