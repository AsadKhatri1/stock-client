import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import AddModal from "./AddModal";
const StockDefault = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate();
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
  useEffect(() => {
    const tokenExists = localStorage.getItem("token");
    if (!tokenExists) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    allThreads();
  }, []);

  // delete thread
  const deleteHandler = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/api/thread/delthread/${id}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      allThreads();
    }
  };
  return (
    <main className="main-container">
      <div className="d-flex align-items-center justify-content-between pr-5">
        <h2 className="font-weight-bold mt-3">Threads Inventory</h2>
        <button
          className="btn btn-primary font-weight-bold"
          onClick={(e) => setShowModal(true)}
        >
          Add New Thread
        </button>
      </div>
      {showModal ? (
        <AddModal showModal={showModal} closeModal={closeModal} />
      ) : null}
      <div className="table-responsive mt-4">
        <table className="table table-striped text-center font-weight-bold">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Colour</th>
              <th scope="col">Code</th>
              <th scope="col">Quantity</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {threads.map((thread, i) => (
              <tr key={thread._id}>
                <td>{i + 1}</td>
                <td>{thread?.Colour}</td>
                <td>{thread?.Code}</td>
                <td>{thread?.Quantity}</td>
                <td>
                  <MdDelete
                    style={{
                      fontSize: "22px",
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteHandler(thread._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default StockDefault;
