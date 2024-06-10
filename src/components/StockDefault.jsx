import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StockDefault = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const tokenExists = localStorage.getItem("token");
    if (!tokenExists) {
      navigate("/");
    }
  }, []);
  return (
    <main className="main-container">
      <h2 className>Threads Inventory</h2>
    </main>
  );
};

export default StockDefault;
