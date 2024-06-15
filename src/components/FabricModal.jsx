import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const FabricModal = (props) => {
  const [Colour, setColour] = useState("");
  const [Length, setLength] = useState("");

  //   adding thread
  const addHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://stock-management-onoq.onrender.com/api/fabric/addfabric",
        { Colour, Length },
        { headers: { Authorization: `${token}` } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        props.closeModal();
        window.location.reload();
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      <div className="modal-wrapper" onClick={() => props.closeModal()}></div>

      <div className="modal-container ">
        <h2 className="font-weight-bold mb-5">New Fabric</h2>
        <form action="post" className="text-center w-100" onSubmit={addHandler}>
          <input
            type="text"
            value={Colour}
            onChange={(e) => setColour(e.target.value)}
            placeholder="Colour"
            style={{
              borderRadius: "12px",
              width: "100%",
              textIndent: "6px",
              border: "1px solid black",
            }}
          />{" "}
          <br /> <br />
          <input
            type="text"
            placeholder="Length"
            value={Length}
            onChange={(e) => setLength(e.target.value)}
            style={{
              borderRadius: "12px",
              width: "100%",
              textIndent: "6px",
              border: "1px solid black",
            }}
          />{" "}
          <br />
          <br />
          <button
            style={{
              borderRadius: "12px",
              width: "100%",

              border: "none",
            }}
            type="submit"
            className="btn btn-success "
            onClick={(e) => addHandler(e)}
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default FabricModal;
