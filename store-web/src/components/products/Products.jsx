import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import Button from "../button/Button";
import { RiEdit2Fill, RiDeleteBin2Fill } from "react-icons/ri";
import "./products.css";
import { useNavigate } from "react-router-dom";
const PRODUCTS_URL = "/products";

function Products({ admin = false }) {
  const { auth } = useAuth();
  const token = auth?.accessToken;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState("");
  let componentMounted = true;

  const getProducts = async () => {
    setLoading(true);
    const response = await axios.get(`${PRODUCTS_URL}`);

    if (componentMounted) {
      setData(await response.data);
      setLoading(false);
    }

    return () => {
      componentMounted = false;
    };
  };

  useEffect(() => {
    getProducts();
  }, []);

  const Loading = () => {
    return <>Loading...</>;
  };

  const handleClick = () => {
    // comprar o anadir al carrito
  };

  const navigate = useNavigate();
  const toAdd = () => {
    navigate("/add");
  };

  const toEdit = (id, name, description, price, imgURL) => {
    //console.log(productData)
    setProduct(name);
    navigate(`/edit/${id}`, { state: { product } });
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`${PRODUCTS_URL}/${productId}`, {
        headers: { "x-access-token": token },
      });
      //console.log(response.data);
      navigate("/adminView");
    } catch (error) {
      console.log(error);
    }
  };

  const ShowProducts = () => {
    return (
      <>
        {data.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4" key={product._id}>
                <div className="card h-100 text-center" key={product._id}>
                  <img
                    src={product.imgURL}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-2">{product.name}</h5>
                    <p className="card-text mb-2">${product.price}</p>

                    {admin ? (
                      <div className="adminBtnContainer">
                        <Button
                          text={<RiEdit2Fill />}
                          colorChange={"toGreen"}
                          onClick={() => toEdit(product._id, product.name)}
                        />
                        <Button
                          text={<RiDeleteBin2Fill />}
                          colorChange={"toRed"}
                          onClick={() => deleteProduct(product._id)}
                        />
                      </div>
                    ) : (
                      <Button
                        text={"Buy"}
                        colorChange={"toGreen"}
                        onClick={handleClick}
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container text-center my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">
              {admin ? "Your Products" : "Latest Products"}
            </h1>
            <hr />
            {admin ? (
              <Button text={"+ Add a new product"} onClick={() => toAdd()} />
            ) : null}
          </div>
        </div>
        <div className="row justify-conten-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
}

export default Products;
