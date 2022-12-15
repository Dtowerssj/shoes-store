import { React, useEffect, useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import Navbar from "../../components/navbar/Navbar";
import Input from "../../components/input/Input";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./addOrUpdate.css";
import Button from "../../components/button/Button";
import axios from "../../api/axios";

const PRODUCT_URL = "/products";

function AddOrUpdate({ type = "add" }) {
  const { auth } = useAuth();
  const token = auth?.accessToken;

  const { productId } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imgURL, setImgURL] = useState("");
  const nameRef = useRef();

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const getProduct = async (productId) => {
    console.log(`Product id: ${productId}`);
    try {
      const response = await axios.get(`${PRODUCT_URL}${productId}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name);
    const data = JSON.stringify({ name, price, description, imgURL });
    console.log(data);
    console.log(typeof data);
    try {
      const response = await axios.post(PRODUCT_URL, data, {
        headers: { "x-access-token": token },
      });
      console.log(JSON.stringify(response?.data));
      navigate("/adminView");
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (productId) => {
    try {
      const response = await axios.get(`${PRODUCT_URL}${productId}`);
      //console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`${PRODUCT_URL}${productId}`);
      //console.log(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addOrUpdate">
      <Navbar />
      <div className="container text-center my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">
              {type === "add" ? "Add Product" : "Edit Product"}
            </h1>
            <hr />

            <div className="container">
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                  Name:
                  <Input
                    type="text"
                    innerRef={nameRef}
                    id="name"
                    value={name}
                    placeholder={"Ex: Adidas Superstar White"}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>

                <label>Price: </label>
                <Input
                  type="text"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={"Ex: 45"}
                />

                <label>Description: </label>
                <Input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={"Ex: Very good pair of shoes"}
                />

                <label>Image Url: </label>
                <Input
                  type="text"
                  id="imgURL"
                  value={imgURL}
                  onChange={(e) => setImgURL(e.target.value)}
                  placeholder={"Ex: https://google.com.ve/airJordan.jpg"}
                />

                <div className="btnContainer">
                  {type === "add" ? (
                    <button type="submit">Create</button>
                  ) : (
                    <Button text={"Update"} colorChange={true} />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddOrUpdate;
