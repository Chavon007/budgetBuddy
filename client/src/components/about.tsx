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
      <div className="w-[100%] h-auto mb-[20px]">
        <div className="w-[95%] mx-auto">
          <div className="flex flex-col gap-2 justify-center items-center p-[40px]">
            <h3 className="md:text-3xl font-roboto font-bold tracking-[2px]">
              About BudgetBuddy
            </h3>
            <p className="w-[100%] text-sm  text-base md:max-w-[550px] font-lora italic text-gray-600 text-center">
              A simple yet powerful tool designed to help you manage your
              personal finances with ease and confidence.
            </p>
          </div>

          {/*  */}
          <div className="flex flex-col gap-3">
            {aboutDetails.map((about, index) => (
              <div className="bg-gray-50 p-[20px] rounded-1xl" key={index}>
                <h4 className="max-w-[50px] h-[50px] bg-gray-200 p-[10px] flex justify-center items-center font-bold text-2xl text-green-500">
                  {about.icon}
                </h4>
                <h3 className="text-1xl font-bold font-roboto text-gray-600">{about.header}</h3>
                <p className="font-lora italic text-gray-600">{about.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;
