import React, { useState } from "react";
import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import Github from "../img/github.png";
import { toast } from "react-toastify";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import firebase from "../../firebase";

import "./Login.css";
import axios from "axios";

const Login = () => {
  const [value, setValue] = useState();
  const [code, setCode] = useState();
  const [trueFalse, SetTrueFalse] = useState(false);

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          SubmitHandler();
          console.log("Recaptcha verified!");
        },
      }
    );
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    if (code) {
      if (code.length > 5) {
        const code1 = code;
        window.confirmationResult
          .confirm(code1)
          .then((result) => {
            const user = result.user;
            console.log(JSON.stringify(user));

            const { data } = axios.post(
              "http://localhost:5000/auth/registerNumber",
              user
            );
            console.log(data);
          })
          .catch((error) => {
            toast.error("Kod xato!!!");
          });
      } else {
        toast.error("Kodni to'gri kiriting");
      }
    } else {
      toast.error("Kodni to'gri kiriting");
    }
  };

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
    if (value.length > 10) {
      SetTrueFalse(true);
      e.preventDefault();

      e.preventDefault();
      const phoneNumber = value;

      configureCaptcha();
      const appVerifier = window.recaptchaVerifier;

      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          console.log(`SEND `);
        })
        .catch((error) => {
          SetTrueFalse(false);
          toast.error("Siz Ko'p bora urunganingiz sababli bloklandingiz!!!");
        });
    } else {
      toast.success("Nomerni tog'ri kiriting");
    }
  };

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
            international
            defaultCountry="UZ"
            className="input"
            placeholder="Enter phone number"
            value={value}
            onChange={setValue}
          />
          {/* 
          <PhoneInput
            // country={'uz'}
            // className='input'
            value={value}
            onChange={setValue}
          /> */}

          <div id="sign-in-button"></div>

          {trueFalse ? (
            <>
              <input
                className="input"
                placeholder="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button className="submit" onClick={onSubmitOTP}>
                Login
              </button>
            </>
          ) : (
            <button className="submit" onClick={SubmitHandler}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
