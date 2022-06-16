import React, { useState } from 'react';
import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import Github from "../img/github.png";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import "./Login.css";

const Login = () => {
  const [value, setValue] = useState()
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  const SubmitHandler = (e) => {
    e.preventDefault()
    console.log(value);
  }

  return (
    <div className="login">
      <h1 className="loginTitle">Login Page</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <PhoneInput
            className='input'
            placeholder="Enter phone number"
            value={value}
            onChange={setValue} />

          <button className="submit" onClick={SubmitHandler}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
