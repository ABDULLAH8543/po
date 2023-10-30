import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import cool from './cool.jpg'
import axios from "axios";

function Code() {
  const products = useSelector((state) => state.allCart.products);
  const dispatch = useDispatch();

  const [successMessages, setSuccessMessages] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3030/products')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => alert('Error fetching data'));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    setSuccessMessages((prevMessages) => ({
      ...prevMessages,
      [product.id]: `Successfully added "${product.name}" to the cart!`,
    }));
    document.getElementById("okmsg").style.display = "block";
    setTimeout(() => {
      document.getElementById("okmsg").style.display = "none";
    }, 600);
  

    setTimeout(() => {
      setSuccessMessages((prevMessages) => ({
        ...prevMessages,
        [product.id]: undefined,
      }));
    }, 3000);
  };

  return (
    <div>
      <div id="head">
        <h1>Shopping Time</h1>
        <Link to="/Cart">
          <p>Cart</p>
        </Link>
        <Link to="/Sign-up">
          <p>Sign-up</p>
        </Link>
      </div>
      <div id="one">
        <img src={cool} alt="Cool" />
        <span>It's shopping time, scroll down</span>
      </div>
      <h1 id="just">New arrivals</h1>
      <div id="okmsg">
          <h1>ADDED TO CART</h1>
        </div>
      <div id="inner">
        {data.map((product) => (
          <div id="outer" key={product.id}>
            <div id="you"></div>
            <span id="span">iii</span>
            <img src={product.image} alt={product.name} height='250px' width='200px' />
            <h1>{product.name}</h1>
            <h4>Price: {product.price}</h4>
            {successMessages[product.id] && (
              <div className="success-messageone">
                {successMessages[product.id]}
              </div>
            )}
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default Code;
