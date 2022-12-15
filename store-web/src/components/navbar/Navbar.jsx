import React from "react";
import img from "../../assets/shoeStoreLogo.png";
import useAuth from "../../hooks/useAuth";
import Button from "../button/Button";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  const toSignUp = () => {
    navigate("/signUp");
  };

  const signOut = async () => {
    setAuth({});
    navigate("/");
  };

  return (
    <div className="all">
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            <img src={img} alt="Sho Store" width="80" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Sale</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Location</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">About us</a>
              </li>
            </ul>

            <div className="d-flex">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {auth?.roles?.find((role) => "admin".includes(role)) ? (
                  <>
                    <li className="nav-item">
                      <Link
                        to="/adminView"
                        className="nav-link active"
                        aria-current="page"
                      >
                        Admin Page
                      </Link>
                    </li>

                    <Button
                      text={"Sign Out"}
                      colorChange={"toRed"}
                      onClick={() => signOut()}
                    />
                  </>
                ) : auth?.email ? (
                  <Button
                    text={"Sign Out"}
                    colorChange={"toRed"}
                    onClick={() => signOut()}
                  />
                ) : (
                  <>
                    <li className="nav-item">
                      <Link
                        to="signIn"
                        className="nav-link active"
                        aria-current="page"
                      >
                        Log in
                      </Link>
                    </li>

                    <Button
                      text={"Register"}
                      colorChange={false}
                      onClick={toSignUp}
                    />
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
