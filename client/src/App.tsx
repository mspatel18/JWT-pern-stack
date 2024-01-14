// import { useState } from 'react'
import { useEffect, useState } from "react";
import "./App.css";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/is-verify", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();
      console.log("is verify?", parseRes);

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkAuthenticated();
    console.log(isAuthenticated);
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean: boolean) => {
    setIsAuthenticated(boolean);
    console.log(isAuthenticated);
  };

  return (
    <div className="p-12">
      {/* <h1>Hello world</h1> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <Register setAuth={setAuth} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />

          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login setAuth={setAuth} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              !isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Dashboard setAuth={setAuth} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
