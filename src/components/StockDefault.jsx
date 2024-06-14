import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import AddModal from "./AddModal";
import { Audio } from "react-loader-spinner";
import { FaEdit } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";
const StockDefault = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const [threads, setThreads] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [quantity, setQuantity] = useState({});
  const navigate = useNavigate();

  // Get all threads
  const allThreads = async () => {
    const response = await axios.get(
      "https://stock-management-onoq.onrender.com/api/thread/allthreads"
    );
    if (response.data.success) {
      setThreads(response.data.threads);
    }
  };

  useEffect(() => {
    const tokenExists = localStorage.getItem("token");
    if (!tokenExists) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    allThreads();
  }, []);

  // Delete thread
  const deleteHandler = async (id) => {
    const response = await axios.delete(
      `https://stock-management-onoq.onrender.com/api/thread/delthread/${id}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      allThreads();
    }
  };

  // Handle edit click
  const handleEditClick = async (thread) => {
    setEditingId(thread._id);
    setQuantity({ ...quantity, [thread._id]: thread.Quantity });
    const response = await axios.put(
      `https://stock-management-onoq.onrender.com/api/thread/updatethread/${thread._id}`,
      { quantity },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
  };

  // Handle change in input field
  const handleChange = (e, id) => {
    setQuantity({ ...quantity, [id]: e.target.value });
  };

  // Handle save click
  const handleSaveClick = async (id) => {
    const newQuantity = quantity[id];
    const response = await axios.put(
      `https://stock-management-onoq.onrender.com/api/thread/updatethread/${id}`,
      { Quantity: newQuantity },
      { headers: { Authorization: localStorage.getItem("token") } }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      setEditingId(null);
      allThreads();
    }
  };

  return (
    <main className="main-container">
      <div className="d-flex align-items-center justify-content-between pr-5">
        <h2 className="font-weight-bold mt-3">Threads Inventory</h2>
        <button
          className="btn btn-primary font-weight-bold"
          onClick={() => setShowModal(true)}
        >
          Add New Thread
        </button>
      </div>
      {showModal ? (
        <AddModal showModal={showModal} closeModal={closeModal} />
      ) : null}
      <div className="table-responsive mt-4">
        <div className="d-flex justify-content-center align-items-center">
          {threads.length === 0 ? (
            <Audio
              height="80"
              width="80"
              radius="9"
              color="grey"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          ) : (
            <table className="table table-striped text-center font-weight-bold">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Colour</th>
                  <th scope="col">Code</th>
                  <th scope="col">Cones</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {threads.map((thread, i) => (
                  <tr key={thread._id}>
                    <td>{i + 1}</td>
                    <td>{thread?.Colour}</td>
                    <td>{thread?.Code}</td>
                    <td>
                      {editingId === thread._id ? (
                        <input
                          style={{
                            borderRadius: "12px",
                            width: "25%",
                            textIndent: "6px",
                            border: "1px solid black",
                          }}
                          type="number"
                          value={quantity[thread._id]}
                          onChange={(e) => handleChange(e, thread._id)}
                        />
                      ) : (
                        thread?.Quantity
                      )}
                    </td>
                    <td>
                      {editingId === thread._id ? (
                        <MdSaveAlt
                          onClick={() => handleSaveClick(thread._id)}
                          style={{
                            fontSize: "22px",
                            color: "green",
                            cursor: "pointer",
                          }}
                        >
                          Save
                        </MdSaveAlt>
                      ) : (
                        <>
                          <FaEdit
                            onClick={() => handleEditClick(thread)}
                            style={{
                              fontSize: "22px",
                              color: "#1c4966",
                              cursor: "pointer",
                            }}
                          >
                            Edit
                          </FaEdit>
                          <MdDelete
                            style={{
                              fontSize: "22px",
                              color: "red",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteHandler(thread._id)}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
};

export default StockDefault;
