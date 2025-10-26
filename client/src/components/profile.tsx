import { useState, useEffect } from "react";
import { ImProfile } from "react-icons/im";
interface profileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currency: string;
}

function Profile() {
  const [profileData, setProfileData] = useState<profileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currency: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/profile", {
        credentials: "include",
      });
      if (!res.ok) {
        console.error("Failed to fetch data");
        return;
      }
      const data = await res.json();
      const user = data.data;
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        email: user.email || "",
        currency: user.currency || "",
      });
    } catch (err: any) {
      console.error("Can't fatch now:", err.message);
      return;
    }
  };
  const editProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/users/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(profileData),
      });

      if (!res.ok) {
        console.error("Can't edit now");
      }

      const data = await res.json();
      setSuccess("Profile Updated");
      setTimeout(() => setSuccess(""), 3000);
      const user = data.data;
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        currency: user.currency || "",
      });
      setIsEditing(false);
    } catch (err: any) {
      console.log("Can't upadte profile now:", err.message);
    }
  };
  return (
    <div className="container mx-auto w-[100%] h-[100vh] bg-[#1d283a]">
      <div className="w-[100%] md:w-[90%]  mx-auto h-auto p-[10px] flex flex-col gap-5">
        <div className=" flex justify-center gap-3 items-center text-2xl lg:text-4xl font-roboto text-white text-center font-bold mt-[30px]">
          <span className="text-red-500 ">
            <ImProfile />
          </span>
          <h2>Your profile</h2>
        </div>
        <div className="w-[100%] lg:w-[80%] mx-auto bg-[#2a3a55] rounded rounded-2xl py-[30px] px-[15px] flex flex-col  h-auto gap-10">
          <h2>
            <span className="text-white  text-1xl font-roboto">Name:</span>
            <span className="text-gray-300 text-xs font-lora">
              {profileData.firstName}
            </span>
            <span className="text-gray-300 text-xs font-lora">
              {profileData.lastName}
            </span>
          </h2>
          <p>
            <span className="text-white  text-1xl font-roboto">Email:</span>
            <span className="text-gray-300 text-xs font-lora">
              {profileData.email}
            </span>
          </p>
          <p>
            <span className="text-white  text-1xl font-roboto">
              Phone Number:
            </span>
            <span className="text-gray-300 text-xs font-lora">
              {profileData.phone}
            </span>
          </p>
          <h6>
            <span className="text-white  text-1xl font-roboto">Currency:</span>
            <span className="text-gray-300 text-xs font-lora">
              {profileData.currency}
            </span>
          </h6>

          <button
            className="bg-[#06996b] p-[10px] flex gap-1 justify-between items-center max-w-[100px] text-white text-sm font-lora cursor-pointer hover:scale-105 transform transition duration:3000 hover:bg-green-500 rounded rounded-1xl"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>

        {isEditing && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 backdrop-blur-sm z-50 ">
            <div className="w-[70%] h-[70vh] p-6 rounded rounded-1xl  bg-[#2a3a55]">
                <div onClick={() => setIsEditing(false)}></div>
            <form className="flex flex-col gap-2" onSubmit={editProfile}>
              <div onClick={() => setIsEditing(false)}></div>
              {success && <p>{success}</p>}
              <label htmlFor="">First Name</label>
              <input
                type="text"
                value={profileData.firstName}
                onChange={(e) =>
                  setProfileData({ ...profileData, firstName: e.target.value })
                }
              />

              <label htmlFor="">Last Name</label>
              <input
                type="text"
                value={profileData.lastName}
                onChange={(e) =>
                  setProfileData({ ...profileData, lastName: e.target.value })
                }
              />
              <label htmlFor="">Email</label>
              <input
                type="text"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
              />
              <label htmlFor="">Phone Number</label>
              <input
                type="text"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
              />
              <label htmlFor="">Currency</label>
              <input
                type="text"
                value={profileData.currency}
                onChange={(e) =>
                  setProfileData({ ...profileData, currency: e.target.value })
                }
              />
              <button type="submit">Save</button>
            </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Profile;
