import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Stock from "./pages/Stock";
import AddStock from "./pages/AddStock";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Fabric from "./pages/Fabric";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/fabric" element={<Fabric />}></Route>
      <Route path="/add" element={<AddStock />}></Route>
      <Route path="/stock" element={<Stock />}></Route>
    </Routes>
  );
}

export default App;
