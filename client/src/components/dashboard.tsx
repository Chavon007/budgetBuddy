import { useState, useEffect } from "react";

interface dashboardList {
  title: string;
  amount: number;
  date: string;
}

function Dashboard() {
  const [money, setMoney] = useState<dashboardList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Faled to fetch information");
        }
        const data = await res.json();
        setMoney(data);
      } catch (err) {
        setError("Can't fetch information");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if(loading){
    return <p>Loading.....</p>
  }
  if(error){
    return <p>{error}</p>
  }
  return <div>wlecom</div>;
}
export default Dashboard;
