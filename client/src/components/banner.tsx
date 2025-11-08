import { GoDotFill } from "react-icons/go";

const bannerpoint = [
  {
    icon: <GoDotFill />,
    text: "Track Spending",
  },
  {
    icon: <GoDotFill />,
    text: "Set Goals",
  },
  {
    icon: <GoDotFill />,
    text: "Save More",
  },
];

function Banner() {
  return (
    <div className="container mx-auto">
      <div className="bg-[#1d283a] w-[100%] h-[40vh] md:h-[50vh] lg:h-[60vh] p-[20px]">
        <div className="w-[100%] md:w-[70%] flex flex-col justify-center h-[30vh] md:h-[40vh] lg:h-[50vh] ">
          <h2 className="text-1xl md:text-3xl lg:text-4xl leading-[3rem] tracking-[2px] font-roboto text-white font-bold">
            Take Control of Your Finances
          </h2>
          <p className="w-[100%] lg:w-[70%] font-lora text-xs md:text-sm italic tracking-[2px] text-gray-200">
            Track expenses, set goals, and achieve financial freedom with
            BudgetBuddy - your personal finance companion.
          </p>
          <div className="flex gap-4 mt-[15px] items-center">
            {bannerpoint.map((t, index) => (
              <div key={index}>
                <p className="flex gap-1 items-center">
                  <span className="text-green-500">{t.icon}</span>
                  <span className="font-inter text-xs text-white">
                    {t.text}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Banner;
