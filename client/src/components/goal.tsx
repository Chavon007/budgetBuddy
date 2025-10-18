import React, { useState, useEffect } from "react";

interface goalFormData {
  theGoal: string;
}

interface setGoals {
  goals: string;
  date: string;
}

interface achivedGoals {
  achivedgoals: string;
  completedDate: string;
}
function Goal() {
  const [goal, setgoal] = useState<goalFormData>({
    theGoal: "",
  });
  const [mainGoals, setMainGoals] = useState<setGoals[]>([]);
  const [achivedGoals, setAchivedGoals] = useState<achivedGoals[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!goal.theGoal) {
      setError("Please fill the required field");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(goal),
      });
      if (!res.ok) {
        setError("can't create Goal now");
        return;
      }
      const data = await res.json();
      setSuccess("Goal created successfully");
      setgoal({
        theGoal: "",
      });
      console.log(data);
    } catch (err) {
      setError("Failed to create Goal");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true);
      try {
        const [setGoalsRes, achivedGoalsRes] = await Promise.all([
          fetch("", {
            credentials: "include",
          }),
          fetch("", {
            credentials: "include",
          }),
        ]);

        if (!setGoalsRes.ok || !achivedGoalsRes.ok) {
          setError("Failed to fetch data");
          return;
        }

        const setGoalData = await setGoalsRes.json();
        const achievegoalsData = await achivedGoalsRes.json();
        setMainGoals(setGoalData.data || []);
        setAchivedGoals(achievegoalsData.data || []);
      } catch (err) {
        setError("Failed to fetch");
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
        </div>
        <div>
          <input
            type="text"
            value={goal.theGoal}
            onChange={(e) => setgoal({ ...goal, theGoal: e.target.value })}
          />
        </div>
        <div>
          <button type="submit">Add Goal</button>
        </div>
      </form>
    </div>
  );
}
export default Goal;
