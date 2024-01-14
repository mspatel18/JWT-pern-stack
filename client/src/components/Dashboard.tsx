import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface RegisterProps {
  setAuth: (value: boolean) => void;
}
const Dashboard: React.FC<RegisterProps> = ({ setAuth }) => {
  const [name, setName] = useState("");
  const getDetails = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "POST",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      //   console.log(parseRes);

      setName(parseRes.user_name);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    toast.info("Logged out Successfully");
  };
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <h1 className=" text-3xl font-bold my-12">
        Welcome <span className=" capitalize">{name}</span>
      </h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Dashboard;
