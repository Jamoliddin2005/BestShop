import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [pass, setPass] = useState("password");

  const SubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (firstName && lastName && email && password) {
        toast.success("Account Created");

        const { data } = await axios.post("/auth/register", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        });

        console.log(data);
      } else {
        toast.error("Ma'mulotlarni to'liq kiriting!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login register">
      <h1 className="loginTitle">Register Page</h1>
      <div className="wrapper wrapperRegister">
        <div className="registerForm">
          <div className="inputsDive">
            <input
              type="text"
              placeholder="FirstName..."
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="LastName..."
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="inputsDive">
            <input
              type="text"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="passwordDIve">
              <input
                type={pass}
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {pass === "password" ? (
                <i
                  className="fa-solid fa-eye eyePass"
                  onClick={(e) => {
                    setPass("text");
                  }}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-eye-slash eyePass"
                  onClick={(e) => {
                    setPass("password");
                  }}
                ></i>
              )}
            </div>
          </div>
          <button className="submit" onClick={SubmitHandler}>
            Register
          </button>
          <Link to="/login" className="createAccount">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
