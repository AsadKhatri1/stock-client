import React, { act, useState } from "react";

import thread from "../assets/thread.png";
import fabric from "../assets/fabric.png";
import { MdOutlineInventory } from "react-icons/md";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [active, setActive] = useState(false);
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
          <li
            className={
              active ? "sidebar-list-item active" : "sidebar-list-item"
            }
          >
            <MdOutlineInventory className="icon" /> DASHBOARD
          </li>
        </Link>
        <Link to="/stock" className="link">
          <li
            className={
              active ? "sidebar-list-item active" : "sidebar-list-item"
            }
          >
            <img
              src={thread}
              alt="Thread"
              style={{ width: "27px", height: "27px" }}
              className="mr-1"
            />
            THREADS
          </li>
        </Link>
        <Link to="/fabric" className="link">
          <li
            className={
              active ? "sidebar-list-item active" : "sidebar-list-item"
            }
          >
            <img
              src={fabric}
              alt="Thread"
              style={{ width: "37px", height: "37px" }}
            />{" "}
            FABRICS
          </li>
        </Link>
      </ul>
    </aside>
  );
};

export default Sidebar;
