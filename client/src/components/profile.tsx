import { useState } from "react";

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
    } catch (err:any) {
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
  return <div>h1</div>;
}
export default Profile;
