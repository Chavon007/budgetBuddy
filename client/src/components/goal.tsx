import React, { useState, useEffect } from "react";

interface goalFormData {
  theGoal: string;
  completed: boolean;
  createdAt: string;
  completedAt: string;
}

function Goal() {
  const [goal, setgoal] = useState<Partial<goalFormData>>({ theGoal: "" });
  const [goals, setgoals] = useState<goalFormData[]>([]);
  const [achievedGoals, setAchievedGoals] = useState<goalFormData[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!goal.theGoal?.trim()) {
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
      setgoals((prev) => [...prev, data]);
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
        const res = await fetch("", {
          credentials: "include",
        });

        if (!res.ok) {
          setError("Failed to fetch data");
          return;
        }

        const data = await res.json();
        setgoals(data || []);
      } catch (err) {
        setError("Failed to fetch");
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  const completedGoals = async (id: string) => {
    try {
      const res = await fetch("", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ completed: true }),
      });
      if (!res.ok) {
        setError("Failed to upadte complted tasks");
        return;
      }
      const updated = await res.json();
      setgoals((prev) => prev.filter((g: any) => g._id !== id));
      setAchievedGoals((prev) => [...prev, updated]);
    } catch (err) {
      setError("Failed to mark as achieved");
    }
  };

  const deleteGoals = async (id: string) => {
    try {
      const res = await fetch("", {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        setError("Can't delete goal now");
        return;
      }
      const deleteGoal = await res.json();
      setgoals((prev) => prev.filter((g: any) => g._id !== id));
     console.log(deleteGoal)
    } catch (err) {
      setError("Failed to delete goals");
    }
  };
  return (
    <div className="container mx-auto">
      <div>
        {/* show error message */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* header */}
        <div>
          <h2>
            <span></span>
            <span>Goals Tracker</span>
          </h2>
          <p>Set your goals and achieve greatness</p>
        </div>

        {/* form for goal */}
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
                placeholder="What's your goal? (e.g., Save $5000 for vacation)"
              />
            </div>
            <div>
              <button type="submit">Add Goal</button>
            </div>
          </form>
        </div>

        {/* achived goal */}

        <div>
          {/* set Goals */}
          <div>
            {/* header */}
            <div>
              <h3>
                <span></span>
                <span>Active Goals</span>
              </h3>
            </div>
            {/* Goals */}
            <div>
              {goals.length === 0 ? (
                <p>No Goal created</p>
              ) : (
                goals.map((goal: any) => (
                  <div key={goal._id}>
                    <input
                      type="checkbox"
                      onChange={() => completedGoals(goal._id)}
                    />
                    <h4>{goal.theGoal}</h4>
                    <small>{goal.createdAt}</small>
                    <button
                      type="submit"
                      onClick={() => deleteGoals(goal._id)}
                    ></button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* achived goals */}
          <div>
            {/* header */}
            <div>
              <span></span>
              <span>Achieved</span>
              <div>
                {/* achived */}
                <div>
                  {achievedGoals.length === 0 ? (
                    <p>No goals achieved yet</p>
                  ) : (
                    achievedGoals.map((achieve, index) => (
                      <div key={index}>
                        <p>{achieve.theGoal}</p>
                        <small>{achieve.completedAt}</small>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Goal;
