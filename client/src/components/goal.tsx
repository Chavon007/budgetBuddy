import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { GoGoal } from "react-icons/go";
import { IoMdCheckmark } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import Back from "./back";
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
      const res = await fetch("http://localhost:5000/api/create-goal", {
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
      setTimeout(() => {
        setSuccess("");
      }, 3000);
      setgoals((prev) => [...prev, data.data]);
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
        const [getGoalsRes, achievedGoalsRes] = await Promise.all([
          fetch("http://localhost:5000/api/get-goals", {
            credentials: "include",
          }),
          fetch("http://localhost:5000/api/achieved-goals", {
            credentials: "include",
          }),
        ]);

        if (!getGoalsRes.ok || !achievedGoalsRes.ok) {
          setError("Failed to fetch data");
          return;
        }

        const getGoalsData = await getGoalsRes.json();
        const achievedGoalsData = await achievedGoalsRes.json();
        setgoals(getGoalsData.data || []);
        setAchievedGoals(achievedGoalsData.data || []);
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
      const res = await fetch(`http://localhost:5000/api/update-goal/${id}`, {
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
      setAchievedGoals((prev) => [...prev, updated.data]);
    } catch (err) {
      setError("Failed to mark as achieved");
    }
  };

  const deleteGoals = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/delete-goal/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        setError("Can't delete goal now");
        return;
      }
      const deleteGoal = await res.json();
      setgoals((prev) => prev.filter((g: any) => g._id !== id));
      console.log(deleteGoal);
    } catch (err) {
      setError("Failed to delete goals");
    }
  };
  return (
    <div className="container mx-auto h-[120vh] bg-[#1d283a]">
      <div className="w-[100%] md:w-[98%] mx-auto h-auto p-[10px] flex flex-col gap-6">
        {/* header */}
        <div className="w-[100%] flex justify-between items-center mt-[40px]">
          <div>
            <h2 className="flex items-center gap-2 text-2xl lg:text-3xl font-roboto text-white  font-bold">
              <span className="text-green-500">
                <GoGoal />
              </span>
              <span>Goals Tracker</span>
            </h2>
            <p className="font-lora text-sm  text-[#607090]">
              Set your goals and achieve greatness
            </p>
          </div>

          <div>
            <Back />
          </div>
        </div>

        {/* form for goal */}
        <div>
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              {error && (
                <p className="font-serif text-red-500 text-xs">{error}</p>
              )}
              {success && (
                <p className="font-serif text-green-500 text-xs">{success}</p>
              )}
            </div>
            <div className="flex justify-between items-center  w-[70%] mx-auto p-[10px] ">
              <div className="bg-[#2a3a55] w-[85%] p-[10px] rounded rounded-1xl">
                <input
                  className="w-[100%] focus:outline-none text-white placeholder:text-sm text-base font-lora"
                  type="text"
                  value={goal.theGoal}
                  onChange={(e) =>
                    setgoal({ ...goal, theGoal: e.target.value })
                  }
                  placeholder="What's your goal? (e.g., Save $5000 for vacation)"
                />
              </div>
              <div>
                <button
                  className="bg-[#06996b] p-[10px] flex gap-1 justify-between items-center max-w-[100px] text-white text-sm font-lora cursor-pointer hover:scale-105 transform transition duration:3000 hover:bg-green-500 rounded rounded-1xl"
                  type="submit"
                >
                  {" "}
                  <span className="font-bold text-1xl">
                    <IoMdAdd />
                  </span>
                  <span>Add Goal</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* achived goal */}

        <div className="h-auto w-[90%] mx-auto flex justify-between mt-[50px]">
          {/* set Goals */}
          <div className="rounded rounded-1xl bg-[#2a3a55] w-[60%] flex flex-col gap-2 p-[10px]">
            {/* header */}
            <div>
              <h3 className="text-[#ba3853] flex items-center gap-2 text-1xl font-bold font-lora">
                <span className="font-bold text-2xl bg-[#492e42] p-[5px] rounded rounded-1xl">
                  <GoGoal />
                </span>
                <span>Active Goals</span>
              </h3>
            </div>
            {/* Goals */}
            <div>
              {goals.length === 0 ? (
                <p className="text-center text-white font-roboto text-1xl italic">
                  No Goal created yet!
                </p>
              ) : (
                goals.map((goal: any) => (
                  <div
                    className="w-[95%] p-[10px] flex justify-between items-center"
                    key={goal._id}
                  >
                    <div className="flex gap-4 items-center">
                      <input
                        type="checkbox"
                        onChange={() => completedGoals(goal._id)}
                      />
                      <span>
                        <h4 className="text-white  text-1xl font-roboto">
                          {goal.theGoal}
                        </h4>
                        <small className="text-gray-300 text-xs font-lora">
                          {goal.createdAt}
                        </small>
                      </span>
                    </div>
                    <button
                      className="text-[#ba3853] font-bold text-2xl bg-[#492e42] p-[5px] rounded rounded-1xl currsor-pointer hover:bg-red-100"
                      type="submit"
                      onClick={() => deleteGoals(goal._id)}
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* achived goals */}
          <div className="rounded rounded-1xl bg-[#2a3a55] w-[30%] flex flex-col gap-2 p-[10px]">
            {/* header */}
            <div className=" flex flex-col gap-2">
              <div className="text-[#06996b] flex items-center gap-2 text-1xl font-bold font-lora">
                <span className="font-bold text-2xl bg-teal-800 p-[5px] rounded rounded-1xl">
                  <IoMdCheckmark />
                </span>
                <span className="">Achieved</span>
              </div>
              <div>
                {/* achived */}
                <div>
                  {achievedGoals.length === 0 ? (
                    <p className="text-center text-white font-roboto text-1xl italic">
                      No goals achieved yet
                    </p>
                  ) : (
                    achievedGoals.map((achieve, index) => (
                      <div key={index}>
                        <p className="text-white  text-1xl font-roboto">
                          {achieve.theGoal}
                        </p>
                        <small className="text-gray-300 text-xs font-lora">
                          {achieve.completedAt}
                        </small>
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
