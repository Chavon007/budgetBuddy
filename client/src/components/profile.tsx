import { useState, useEffect } from "react";

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
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    try {
      const res = await fetch("", {
        credentials: "include",
      });
      if (!res.ok) {
        console.error("Failed to fetch data");
        return;
      }
      const data = await res.json();
      setProfileData({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        currency: data.currency,
      });
    } catch (err: any) {
      console.error("Can't fatch now:", err.message);
      return;
    }
  };
  const editProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("", {
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
      setProfileData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        currency: data.currency || "",
      });
    } catch (err: any) {
      console.log("Can't upadte profile now:", err.message);
    }
  };
  return (
    <div className="container mx-auto">
      <div>
        <div>
          <h2>
            <span>Name</span>
            <span>{profileData.firstName}</span>
            <span>{profileData.lastName}</span>
          </h2>
          <p>
            <span>Email:</span>
            <span>{profileData.email}</span>
          </p>
          <p>
            <span>Phone Number:</span>
            <span>{profileData.phone}</span>
          </p>
          <h6>
            <span>Currency:</span>
            <span>{profileData.currency}</span>
          </h6>
        </div>

        <div>
            <form onSubmit={editProfile}>
                {success && <p>{success}</p>}
                <label htmlFor="">First Name</label>
                <input type="text" value={profileData.firstName}  onChange={(e) => setProfileData({...profileData, firstName:e.target.value})} />

                <label htmlFor="">Last Name</label>
                <input type="text"  value={profileData.lastName} onChange={(e) => setProfileData({...profileData, lastName:e.target.value})}/>
                 <label htmlFor="">Email</label>
                <input type="text"  value={profileData.email} onChange={(e) => setProfileData({...profileData, email:e.target.value})}/>
                 <label htmlFor="">Phone Number</label>
                <input type="text" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone:e.target.value})}/>
                 <label htmlFor="">Currency</label>
                <input type="text" value={profileData.currency} onChange={(e) => setProfileData({...profileData, currency:e.target.value})}/>
                <button type="submit">Save</button>
            </form>
        </div>
      </div>
    </div>
  );
}
export default Profile;
