import React from "react";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineInventory } from "react-icons/md";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside id="sidebar">
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <MdOutlineInventory className="icon_header" /> INVENTORY
        </div>
        <span className="icon close_icon">X</span>
      </div>
      <ul className="sidebar-list">
        <Link to="/home" className="link">
          <li className="sidebar-list-item">
            <MdOutlineInventory className="icon" /> DASHBOARD
          </li>
        </Link>
        <Link to="/stock" className="link">
          <li className="sidebar-list-item">
            <MdOutlineInventory className="icon" /> THREADS
          </li>
        </Link>
        <Link to="/fabric" className="link">
          <li className="sidebar-list-item">
            <MdOutlineInventory className="icon" /> FABRIC
          </li>
        </Link>
        <Link to="/add" className="link">
          <li className="sidebar-list-item">
            <MdOutlineInventory className="icon" /> ADD NEW
          </li>
        </Link>
      </ul>
    </aside>
  );
};

export default Sidebar;
