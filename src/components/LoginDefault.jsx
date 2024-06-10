import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginDefault = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  // checking for localstorage
  useEffect(() => {
    const tokenExists = localStorage.getItem("token");
    if (tokenExists) {
      navigate("/home");
    }
  }, []);

  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/login/",
        { Email, Password }
      );
      if (response.data.success) {
        setEmail("");
        setPassword("");
        toast.success(response.data.message, {
          style: {
            backgroundColor: "black",
            color: "white",
          },
        });
        navigate("/stock");
        localStorage.setItem("token", response.data.token);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  return (
    <div className="main vw-100 vh-100 d-flex flex-column align-items-center justify-content-center">
      <h2 className="font-weight-bold" style={{ color: "white" }}>
        LOGIN
      </h2>
      <div className="formdiv w-75 h-75 border row align-items-center justify-content-center">
        <form
          onSubmit={submitHandler}
          action="post"
          className="w-100 d-flex flex-column align-items-center justify-content-center"
        >
          <input
            style={{
              borderRadius: "16px",
              padding: "8px 5px",
              border: "2px solid black",
              textIndent: "8px",
            }}
            className="w-75"
            type="email"
            placeholder="Enter Email Address"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <br />
          <input
            style={{
              borderRadius: "16px",
              padding: "8px 5px",
              border: "2px solid black",
              textIndent: "8px",
            }}
            className="w-75"
            type="password"
            placeholder="Enter Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <br />
          <button
            type="submit"
            className="btn btn-success px-4 fw-bold mt-5"
            style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginDefault;
