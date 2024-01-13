// import { useState } from 'react'
import { useEffect, useState } from "react";
import "./App.css";
import Register from "./components/Register";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/is-verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean: boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <div className="p-12">
      {/* <h1>Hello world</h1> */}
      <Register />
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
