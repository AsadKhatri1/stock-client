import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import thread from "../assets/thread.png";
import fabric from "../assets/fabric.png";
import admin from "../assets/admin.png";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Audio } from "react-loader-spinner";
ChartJS.register(
  CategoryScale,
  LinearScale,

  BarElement,
  Title,
  Tooltip,
  Legend
);
const HomeDefault = () => {
  const [threads, setThreads] = useState(0);
  const [fabrics, setFabrics] = useState(0);
  const [admins, setAdmins] = useState(0);
  const options = {};
  const data = {
    labels: ["Threads", "Fabrics"],
    datasets: [
      {
        label: "Number of Threads/Fabrics",
        data: [threads.length, fabrics.length],
        borderColor: "black",
        backgroundColor: "#A9A8A9",
        borderWidth: 2,
      },
    ],
  };
  const allThreads = async () => {
    const response = await axios.get(
      "https://stock-management-onoq.onrender.com/api/thread/allthreads"
    );
    if (response.data.success) {
      setThreads(response.data.threads);
    }
  };
  const allFabrics = async () => {
    const response = await axios.get(
      "https://stock-management-onoq.onrender.com/api/fabric/allfabric"
    );
    if (response.data.success) {
      setFabrics(response.data.fabrics);
    }
  };
  const allAdmins = async () => {
    const response = await axios.get(
      "https://stock-management-onoq.onrender.com/api/admin/getAdmins"
    );
    if (response.data.success) {
      setAdmins(response.data.admins);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    const tokenExists = localStorage.getItem("token");
    if (!tokenExists) {
      navigate("/");
    } else {
      allThreads();
      allFabrics();
      allAdmins();
    }
  }, []);
  return (
    <main className="main-container">
      <div className="main-title">
        <h1>Dashboard</h1>
      </div>
      <div className="row my-3">
        <div className="col-md-4">
          <div className="card p-4" style={{ borderRadius: "16px" }}>
            <div className="d-flex justify-content-between align-items-center px-2">
              <h2 className="font-weight-bold">Total Threads</h2>
              <img
                src={thread}
                alt="Thread"
                style={{ width: "30px", height: "30px" }}
              />
            </div>
            <div className="number px-3 mt-5 d-flex justify-content-end align-items-center">
              <h1 className="font-weight-bold">
                {threads.length ? (
                  threads.length
                ) : (
                  <Audio
                    height="50"
                    width="50"
                    radius="9"
                    color="grey"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                  />
                )}
              </h1>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-4" style={{ borderRadius: "16px" }}>
            <div className="d-flex justify-content-between align-items-center px-2">
              <h2 className="font-weight-bold">Total Fabrics</h2>
              <img
                src={fabric}
                alt="Thread"
                style={{ width: "44px", height: "44px" }}
              />
            </div>
            <div className="number px-3 mt-5 d-flex justify-content-end align-items-center">
              <h1 className="font-weight-bold">
                {fabrics.length ? (
                  fabrics.length
                ) : (
                  <Audio
                    height="50"
                    width="50"
                    radius="9"
                    color="grey"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                  />
                )}
              </h1>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-4" style={{ borderRadius: "16px" }}>
            <div className="d-flex justify-content-between align-items-center px-2">
              <h2 className="font-weight-bold">Total Admins</h2>
              <img
                src={admin}
                alt="Thread"
                style={{ width: "40px", height: "40px" }}
              />
            </div>
            <div className="number px-3 mt-5 d-flex justify-content-end align-items-center">
              <h1 className="font-weight-bold">
                {admins.length ? (
                  admins.length
                ) : (
                  <Audio
                    height="50"
                    width="50"
                    radius="9"
                    color="grey"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                  />
                )}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="graph">
        <Bar
          options={options}
          data={data}
          style={{ width: "100%", height: "400px" }}
        />
      </div>
    </main>
  );
};

export default HomeDefault;
