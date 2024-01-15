import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface RegisterProps {
  setAuth: (value: boolean) => void;
}

const Dashboard: React.FC<RegisterProps> = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [loginMessages, setLoginMessages] = useState<string[]>([]);
  const [randomMessage, setRandomMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * loginMessages.length);
    setRandomMessage(loginMessages[randomIndex]);
  };

  const getDetails = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const parseRes = await response.json();
      setName(parseRes.user_name);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching user details");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    toast.info("Logged out Successfully");
  };

  useEffect(() => {
    // Fetch login messages from the external JSON file
    fetch("/message.json")
      .then((response) => response.json())
      .then((data) => setLoginMessages(data.messages))
      .catch((error) => {
        console.error("Error fetching login messages:", error);
        toast.error("Error fetching login messages");
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      getRandomMessage();
    }
  }, [loading]);

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold my-12">
        Welcome <span className="capitalize">{name}</span>
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="my-4">{randomMessage}</p>
        </>
      )}
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Dashboard;
