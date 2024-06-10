import React from "react";
import AddStockDefault from "../components/AddStockDefault";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const AddStock = () => {
  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <AddStockDefault />
    </div>
  );
};

export default AddStock;
