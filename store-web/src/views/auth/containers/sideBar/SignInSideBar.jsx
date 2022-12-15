import React, { useState, useRef, useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../../../assets/shoeStoreLogo.png";
import Input from "../../../../components/input/Input";
import axios from "../../../../api/axios";
import "./sideBar.css";

const SIGNIN_URL = "/auth/signIn";

function SignInSideBar() {
  const { setAuth } = useAuth();

  // Navegacion e historial de rutas
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = JSON.stringify({ email, password });
    console.log(data);
    console.log(typeof data);
    try {
      const response = await axios.post(SIGNIN_URL, data, {
        headers: { "Content-Type": "application/json" },
        "Access-Control-Allow-Credentials": true,
      });
      const accessToken = response?.data?.token;
      const roles = response?.data.roles;
      setAuth({ email, password, roles, accessToken });
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
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
        <h3>Sign in</h3>
        <label htmlFor="email">
          <Input
            type="email"
            id="email"
            innerRef={userRef}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
        </label>
        <label htmlFor="password">
          <Input
            type="password"
            id="password"
            innerRef={userRef}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </label>
        <button type="submit">Log in</button>
      </form>

      <h4>
        Don't have an account?
        <span>
          <Link to="/signUp"> Register</Link>
        </span>
      </h4>
    </div>
  );
}

export default SignInSideBar;
