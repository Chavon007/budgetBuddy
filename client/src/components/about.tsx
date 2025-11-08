import { IoTrendingUpOutline } from "react-icons/io5";
import { FaNairaSign } from "react-icons/fa6";
import { GrAnalytics } from "react-icons/gr";
import { GoGoal } from "react-icons/go";

const aboutDetails = [
  {
    icon: <IoTrendingUpOutline />,
    header: "Track Expenses",
    text: "Monitor your spending in real-time and identify where your money goes.",
  },
  {
    icon: <FaNairaSign />,
    header: "Budget Planning",
    text: "Create custom budgets and stay on track with intelligent alerts.",
  },
  {
    icon: <GrAnalytics />,
    header: "Smart Analytics",
    text: "Get insights into your spending patterns with visual charts and reports.",
  },
  {
    icon: <GoGoal />,
    header: "Set Goals",
    text: "Define financial goals and track your progress towards achieving them.",
  },
];

function About() {
  return (
    <div className="container mx-auto">
      <div className="w-[100%] h-auto">
        <div className="w-[95%] mx-auto">
          <div className="flex flex-col gap-2 justify-center items-center p-[40px]">
            <h3 className="text-3xl font-roboto font-bold tracking-[2px]">
              About BudgetBuddy
            </h3>
            <p className="max-w-[550px] font-lora italic text-gray-600 text-center">
              A simple yet powerful tool designed to help you manage your
              personal finances with ease and confidence.
            </p>
          </div>

          {/*  */}
          <div className="flex flex-col gap-3">
            {aboutDetails.map((about, index) => (
              <div className="bg-[#1d283a] p-[20px] rounded-1xl" key={index}>
                <h4 className="w-[10%] bg-[#182333] p-[10px] flex justify-center items-center">{about.icon}</h4>
                <h3>{about.header}</h3>
                <p>{about.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;
