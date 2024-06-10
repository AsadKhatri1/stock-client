import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeDefault = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const tokenExists = localStorage.getItem("token");
    if (!tokenExists) {
      navigate("/");
    }
  }, []);
  return (
    <main className="main-container">
      <div className="main-title">
        <h1>Dashboard</h1>
      </div>
    </main>
  );
};

export default HomeDefault;
