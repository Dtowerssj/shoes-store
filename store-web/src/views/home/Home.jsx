import React from "react";
import bg from "../../assets/bg3-2.png";
import Navbar from "../../components/navbar/Navbar";
import Products from "../../components/products/Products";
import useAuth from "../../hooks/useAuth";

import "./home.css";

function Home() {

  const {auth} = useAuth();
  console.log(auth)

  return (
    <>
      <Navbar />
      <div className="hero">
        <div className="card text-center text-bg-dark border-0">
          <img src={bg} className="card-img" alt="Background" />
          <div className="card-img-overlay d-flex flex-column justify-content-center">
            <div className="container">
              <h5 className="card-title fw-bolder display-3 mb-0">
                CHRISTMAS SAVINGS
              </h5>
              <p className="card-text lead fs-2">50% Off All Items</p>
            </div>
          </div>
        </div>
        <Products admin={false} />
      </div>
    </>
  );
}

export default Home;
