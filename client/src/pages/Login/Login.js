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
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");
  const [trueFalse, SetTrueFalse] = useState(false);
  const [accountCode, SetAccountCode] = useState(false);
  const [switcher, SetSwitcher] = useState(false);
  const [password, SetPassword] = useState("");
  const [repeatpassword, SetRepeatPassword] = useState("");
  const [inputActive, setInputActive] = useState("input notactive");
  const [user, setUser] = useState("")
  const [inputClass, setInputClass] = useState("input")

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
            SetAccountCode(true);
            setUser(user)

          })
          .catch((error) => {
            return toast.error("Kod xato!!!");
          });
      } else {
        return toast.error("Kodni to'gri kiriting");
      }
    } else {
      return toast.error("Kodni to'gri kiriting");
    }
  };

  const SubmitCode = (req, res) => {
    console.log(user);
    // const { data } = axios.post(
    //   "http://localhost:5000/auth/registerNumber",
    //   user
    // );
    // console.log(data);
  }

  const google = () => {
    return window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    return window.open("http://localhost:5000/auth/github", "_self");
  };

  const facebook = () => {
    return window.open("http://localhost:5000/auth/facebook", "_self");
  };

  const SubmitHandler = (e) => {
    if (value.length > 10) {

      e.preventDefault();

      const phoneNumber = value;

      configureCaptcha();
      const appVerifier = window.recaptchaVerifier;

      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          SetTrueFalse(true);
          window.confirmationResult = confirmationResult;
          // const btn = document.querySelector(".codeAccountBtn");
          // btn.setAttribute("disabled", "true");
        })
        .catch((error) => {
          SetTrueFalse(false);
          return toast.error(
            "Siz Ko'p bora urunganingiz sababli bloklandingiz!!!"
          );
        });
    } else {
      return toast.error("Nomerni tog'ri kiriting");
    }
  };



  const RepeatPass = (e) => {
    if (e.target.placeholder === "Account Password") {
      SetRepeatPassword(e.target.value);
      const btn = document.querySelector(".codeAccountBtn");
      btn.setAttribute("disabled", "true");
      if (password === e.target.value) {
        setInputActive("input active")
        btn.setAttribute("disabled", "false");
        btn.className = "submit codeAccountBtn activeBTN";
      } else {
        setInputActive("input notactive")
        btn.setAttribute("disabled", "true");
        btn.className = "submit codeAccountBtn NotactiveBTN";
      }

      if (password.length > 5) {
        setInputClass("input min6")
      }
    } else {
      SetPassword(e.target.value);
      const btn = document.querySelector(".codeAccountBtn");
      btn.setAttribute("disabled", "true");
      setInputActive("input active")
      if (repeatpassword === e.target.value) {
        setInputActive("input active")
        btn.setAttribute("disabled", "false");
        btn.className = "submit codeAccountBtn activeBTN";
      } else {
        setInputActive("input notactive")
        btn.setAttribute("disabled", "true");
        btn.className = "submit codeAccountBtn NotactiveBTN";
      }
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

          <div id="sign-in-button"></div>
          {trueFalse ? (
            <>
              {accountCode ? (
                <>
                  <div className="inputsLoginPass">
                    <input
                      className={inputClass}
                      placeholder="Create Password"
                      value={password}
                      type={switcher ? "text" : "password"}
                      onChange={(e) =>
                        RepeatPass(e)
                      }
                    />
                    <div className="switcher">
                      {switcher ? (
                        <div
                          className="on"
                          onClick={() => {
                            SetSwitcher(false);
                          }}
                        >
                          🙈
                        </div>
                      ) : (
                        <div
                          className="off"
                          onClick={() => {
                            SetSwitcher(true);
                          }}
                        >
                          🐵
                        </div>
                      )}
                    </div>
                  </div>
                  <input
                    type={"password"}
                    className={inputActive}
                    placeholder="Account Password"
                    value={repeatpassword}
                    onChange={(e) => {
                      RepeatPass(e);
                    }}
                  />
                </>
              ) : (
                <>
                  <input
                    className="input codeSubmit"
                    placeholder="Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <button className="submit" onClick={onSubmitOTP}>
                    Login
                  </button>
                </>
              )}
            </>
          ) : (
            <button className="submit" onClick={SubmitHandler}>
              Login
            </button>
          )}

          {accountCode ? (
            <button className="submit codeAccountBtn" onClick={SubmitCode}>Code Account</button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
