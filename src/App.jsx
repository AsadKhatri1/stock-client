import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Stock from "./pages/Stock";

import Login from "./pages/Login";

import Home from "./pages/Home";
import { searchContext } from "./context/context";
import Fabric from "./pages/Fabric";
function App() {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <searchContext.Provider value={{ showSearch, setShowSearch }}>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/fabric" element={<Fabric />}></Route>

        <Route path="/stock" element={<Stock />}></Route>
      </Routes>
    </searchContext.Provider>
  );
}

export default App;
