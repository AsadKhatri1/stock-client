import React from "react";
import HomeDefault from "../components/HomeDefault";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <HomeDefault />
    </div>
  );
};

export default Home;
