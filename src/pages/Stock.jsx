import React from "react";
import StockDefault from "../components/StockDefault";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Stock = () => {
  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <StockDefault />
    </div>
  );
};

export default Stock;
