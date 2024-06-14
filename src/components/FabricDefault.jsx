import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Audio } from "react-loader-spinner";
import FabricModal from "./FabricModal";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";
const FabricDefault = () => {
  const [fabrics, setFabrics] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [length, setLength] = useState({});
  const closeModal = () => setShowModal(false);

  // Get all fabrics
  const allFabrics = async () => {
    const response = await axios.get(
      "https://stock-management-onoq.onrender.com/api/fabric/allfabric"
    );
    if (response.data.success) {
      setFabrics(response.data.fabrics);
    }
  };

  useEffect(() => {
    allFabrics();
  }, []);

  // Deleting fabric
  const deleteHandler = async (id) => {
    const response = await axios.delete(
      `https://stock-management-onoq.onrender.com/api/fabric/deletefabric/${id}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      allFabrics();
    }
  };

  // Handle edit click
  const handleEditClick = async (fabric) => {
    setEditingId(fabric._id);
    setLength({ ...length, [fabric._id]: fabric.Length });
    const response = await axios.put(
      `https://stock-management-onoq.onrender.com/api/fabric/updatefabric/${fabric._id}`,
      { length },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
  };

  // Handle change in input field
  const handleChange = (e, id) => {
    setLength({ ...length, [id]: e.target.value });
  };

  // Handle save click
  const handleSaveClick = async (id) => {
    const newLength = length[id];
    const response = await axios.put(
      `https://stock-management-onoq.onrender.com/api/fabric/updatefabric/${id}`,
      { Length: newLength },
      { headers: { Authorization: localStorage.getItem("token") } }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      setEditingId(null);
      allFabrics();
    }
  };

  return (
    <main className="main-container">
      <div className="d-flex align-items-center justify-content-between pr-5">
        <h2 className="font-weight-bold mt-3">Fabrics Inventory</h2>
        <button
          className="btn btn-primary font-weight-bold"
          onClick={() => setShowModal(true)}
        >
          Add New Fabric
        </button>
      </div>
      {showModal ? (
        <FabricModal showModal={showModal} closeModal={closeModal} />
      ) : null}
      <div className="table-responsive mt-4">
        <div className="d-flex align-items-center justify-content-center my-2">
          {fabrics.length === 0 ? (
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
                  <th scope="col">Length</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {fabrics.map((fabric, i) => (
                  <tr key={fabric._id}>
                    <td>{i + 1}</td>
                    <td>{fabric?.Colour}</td>
                    <td>
                      {editingId === fabric._id ? (
                        <input
                          style={{
                            borderRadius: "12px",
                            width: "25%",
                            textIndent: "6px",
                            border: "1px solid black",
                          }}
                          type="number"
                          value={length[fabric._id]}
                          onChange={(e) => handleChange(e, fabric._id)}
                        />
                      ) : (
                        fabric?.Length
                      )}
                    </td>
                    <td>
                      {editingId === fabric._id ? (
                        <MdSaveAlt
                          onClick={() => handleSaveClick(fabric._id)}
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
                            onClick={() => handleEditClick(fabric)}
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
                            onClick={() => deleteHandler(fabric._id)}
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

export default FabricDefault;
