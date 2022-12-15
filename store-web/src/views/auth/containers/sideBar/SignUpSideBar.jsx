import React, { useRef, useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../../../api/axios";
import logo from "../../../../assets/shoeStoreLogo.png";
import Input from "../../../../components/input/Input";
import "./sideBar.css";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const SIGNUP_URL = "/auth/signUp";

function SignUpSideBar() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    //console.log(result);
    //console.log(password);
    setValidPassword(result);
    const match = password === matchPassword;
    //console.log(matchPassword);
    //console.log(match);
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Si alguien habilita el botón
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);

    if (!v1) {
      setErrMsg(`Email should contain @ and .X \n ex: john@domain.com`);
      return;
    }

    if (!v2) {
      setErrMsg(`Password should contain at least 8 characters." +
      At least one number, one Uppercase, one Lowercase and one of these symbols: !@#$%`);
      return;
    }

    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({ name, email, password }),
        {
          headers: { "Content-Type": "application/json" },
          "Access-Control-Allow-Credentials": true,
        }
      );
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));
      const accessToken = response?.data?.token;
      const roles = response?.data.roles;
      setAuth({ email, password, roles, accessToken });
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.respnse?.status === 409) {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
        <div className="sidebar-container">
          <p
            ref={errRef}
            className={errMsg ? "errMsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="sidebar-logoWrapper">
            <Link to={"/"}>
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <form className="sidebar-form" onSubmit={handleSubmit}>
            <h3>Register</h3>
            <div className="input-container">
              <label htmlFor="name">
                <Input
                  type="text"
                  placeholder="Name"
                  innerRef={userRef}
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </label>
              <div
                className={name !== "" ? "valid-status" : "invalid-status"}
              />
            </div>

            <div className="input-container">
              <label htmlFor="email">
                <Input
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={email}
                  autoComplete="off"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
              </label>
              <div className={validEmail ? "valid-status" : "invalid-status"} />
            </div>
            <p
              id="uidnote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <div className="input-container">
              <label htmlFor="password">
                <Input
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  itsvalid={validPassword}
                  required
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
              </label>
              <div
                className={validPassword ? "valid-status" : "invalid-status"}
              />
            </div>
            <p
              id="pwdnote"
              className={
                passwordFocus && !validPassword ? "instructions" : "offscreen"
              }
            >
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <div className="input-container">
              <label htmlFor="confirmPassword">
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  onChange={(e) => setMatchPassword(e.target.value)}
                  value={matchPassword}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
              </label>
              <div
                className={
                  validMatch && matchPassword !== ""
                    ? "valid-status"
                    : "invalid-status"
                }
              />
            </div>
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              Must match the first password input field.
            </p>
            <button type="submit">Register</button>
          </form>
          <div>
            <p className="sidebar-terms">
              By signing up, I agree to the Privacy Policy <br /> and Terms of
              Service
            </p>
            <h4>
              Already have an account?
              <span>
                <Link to="/signIn"> Log in</Link>
              </span>
            </h4>
          </div>
        </div>
  );
}

export default SignUpSideBar;
