import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StockDefault = () => {
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const tokenExists = localStorage.getItem("token");
    if (!tokenExists) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    allThreads();
  }, []);
  // get all threads
  const allThreads = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/thread/allthreads"
    );
    if (response.data.success) {
      setThreads(response.data.threads);
      console.log(response);
      console.log(threads);
    }
  };
  return (
    <main className="main-container">
      <h2 className="font-weight-bold mt-3">Threads Inventory</h2>
      <div className="table-responsive mt-4">
        <table className="table text-center font-weight-bold">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Colour</th>
              <th scope="col">Code</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {threads.map((thread, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{thread?.Colour}</td>
                <td>{thread?.Code}</td>
                <td>{thread?.Quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default StockDefault;
