import React from "react";
import FabricDefault from "../components/FabricDefault";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Fabric = () => {
  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <FabricDefault />
    </div>
  );
};

export default Fabric;
