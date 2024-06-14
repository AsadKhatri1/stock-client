import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddModal = (props) => {
  const navigate = useNavigate();
  const [Colour, setColour] = useState("");
  const [Code, setCode] = useState("");
  const [Quantity, setQuantity] = useState("");
  const allThreads = async () => {
    const response = await axios.get(
      "https://stock-management-onoq.onrender.com/api/thread/allthreads"
    );
    if (response.data.success) {
      setThreads(response.data.threads);
    }
  };

  //   adding thread
  const addHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      console.log(Colour, Code, Quantity);
      const response = await axios.post(
        "https://stock-management-onoq.onrender.com/api/thread/addthread",
        { Colour, Code, Quantity },
        { headers: { Authorization: `${token}` } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        props.closeModal();
        // window.location.reload();
        allThreads();
        navigate("/stock");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      <div className="modal-wrapper" onClick={() => props.closeModal()}></div>

      <div className="modal-container ">
        <h2 className="font-weight-bold mb-5">New Thread</h2>
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
            placeholder="Code"
            value={Code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              borderRadius: "12px",
              width: "100%",
              textIndent: "6px",
              border: "1px solid black",
            }}
          />{" "}
          <br />
          <br />
          <input
            type="number"
            placeholder="Quantity"
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
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

export default AddModal;
