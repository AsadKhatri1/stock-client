import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddStockDefault = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const tokenExists = localStorage.getItem("token");
    if (!tokenExists) {
      navigate("/");
    }
  }, []);
  return (
    <main className="main-container">
      <h2>Add Stock</h2>
    </main>
  );
};

export default AddStockDefault;
