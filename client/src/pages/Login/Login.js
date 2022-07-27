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

const Login = ({ user, setUser }) => {
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");
  const [trueFalse, SetTrueFalse] = useState(false);
  const [accountCode, SetAccountCode] = useState(false);
  const [switcher, SetSwitcher] = useState(false);
  const [password, SetPassword] = useState("");
  const [repeatpassword, SetRepeatPassword] = useState("");
  const [inputActive, setInputActive] = useState("input notactive");
  const [account, setAccount] = useState("");
  const [passwordNumber, setPasswordNumber] = useState("");
  const [accountPassword, setAccountPassword] = useState(false);

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
            const user = result.user.phoneNumber;
            SetAccountCode(true);
            setAccount(user);
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
  const SubmitCode = async (req, res) => {
    if (password !== "") {
      if (password.length > 5) {
        const { data } = await axios.post(
          "http://localhost:5000/auth/registerNumber",
          {
            phoneNumber: account,
            password: password,
          },
          {
            withCredentials: true,
          }
        );
        const user = {
          googleId: data.data.googleId,
          password: data.data.password,
          phoneNumber: data.data.phoneNumber,
          avatar: "/uploads/user.png",
        };
        setUser(user);
        return toast.success("Success");
      } else {
        return toast.error("Parol juda qisqa");
      }
    } else {
      return toast.error("Parol juda qisqa");
    }
  };
  const google = () => {
    return window.open("http://localhost:5000/auth/google", "_self");
  };
  const github = () => {
    return window.open("http://localhost:5000/auth/github", "_self");
  };
  const facebook = () => {
    return window.open("http://localhost:5000/auth/facebook", "_self");
  };

  const SubmitHandler = async (e) => {
    if (value.length > 10) {
      const { data } = await axios.post("http://localhost:5000/auth/userFind", {
        phoneNumber: value,
      });
      if (data.data) {
        const phoneNumber = value;
        configureCaptcha();
        const appVerifier = window.recaptchaVerifier;

        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            SetTrueFalse(true);
            return (window.confirmationResult = confirmationResult);
          })
          .catch((error) => {
            return SetTrueFalse(false);
          });
      } else {
        return setAccountPassword(true);
      }
    } else {
      return toast.error("Nomerni tog'ri kiriting");
    }
  };

  const RepeatPass = (e) => {
    if (e.target.placeholder === "Repeat Password") {
      SetRepeatPassword(e.target.value);
      const btn = document.querySelector(".codeAccountBtn");

      if (password === e.target.value) {
        setInputActive("input active");
        return (btn.className = "submit codeAccountBtn activeBTN");
      } else {
        setInputActive("input notactive");
        return (btn.className = "submit codeAccountBtn NotactiveBTN");
      }
    } else {
      SetPassword(e.target.value);
      const btn = document.querySelector(".codeAccountBtn");
      setInputActive("input active");

      if (repeatpassword === e.target.value) {
        setInputActive("input active");
        return (btn.className = "submit codeAccountBtn activeBTN");
      } else {
        const btn = document.querySelector(".codeAccountBtn");
        setInputActive("input notactive");
        return (btn.className = "submit codeAccountBtn NotactiveBTN");
      }
    }
  };

  const AccountPasswordSubmitHandler = async (req, res) => {
    const { data } = await axios.post(
      "http://localhost:5000/auth/PostPasswordSubmit",
      { phoneNumber: value, password: passwordNumber },
      {
        withCredentials: true,
      }
    );
    if (data.success) {
      if (!data.data.user.avatar) {
        const userInfo = {
          googleId: data.data.user.googleId,
          password: data.data.user.password,
          phoneNumber: data.data.user.phoneNumber,
          firstName: data.data.user.phoneNumber,
          avatar: "/uploads/user.png",
        };
        setUser(userInfo);
        return toast.success("SUCCESS");
      }
    } else {
      return toast.error("Password is Incorrect");
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
          {accountPassword ? (
            <>
              <div className="inputsLoginPass">
                <input
                  className={"input accountPass"}
                  placeholder="Password"
                  value={passwordNumber}
                  minLength={6}
                  type={switcher ? "text" : "password"}
                  onChange={(e) => setPasswordNumber(e.target.value)}
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
              <button className="submit" onClick={AccountPasswordSubmitHandler}>
                Login
              </button>
            </>
          ) : (
            <>
              {trueFalse ? (
                <>
                  {accountCode ? (
                    <>
                      <div className="inputsLoginPass">
                        <input
                          className={"input"}
                          placeholder="Create Password"
                          value={password}
                          minLength={6}
                          type={switcher ? "text" : "password"}
                          onChange={(e) => RepeatPass(e)}
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
                        placeholder="Repeat Password"
                        value={repeatpassword}
                        minLength={6}
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
            </>
          )}

          <div id="sign-in-button"></div>

          {accountCode ? (
            <button className="submit codeAccountBtn" onClick={SubmitCode}>
              Code Account
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
