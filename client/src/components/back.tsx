import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
function Back() {
  return (
    <div className="max-w-[300px] hover:bg-gray-700 bg-transpartent p-[10px]">
      <div className="">
        <Link className="flex justify-between   gap-1 items-center" to="/home">
          <span className="text-2xl text-green-500">
            <FaHome />
          </span>

          <span className="text-white font-lora text-sm italic">Back Home</span>
        </Link>
      </div>
    </div>
  );
}
export default Back;
