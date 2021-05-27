import "./CartItem.css";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";

const CartItem = (props) => {
  const [quantity, setQuantity] = useState();

  useEffect(() => {
    setQuantity(props.item.quantity);
  }, [props.item.quantity]);

  return (
    <div className="CartItem">
      <img
        className="cart-image"
        src={props.item.image}
        alt={props.item.name}
      />
      <div className="cart-body">
        <div className="cart-name">
          {props.item.name} - Php: {props.item.price}.00
        </div>
        <div className="cart-buttons">
          <button
            className="decrement"
            onClick={() => {
              props.decrement(props.item.id);
            }}
            disabled={quantity === 1 ? true : false}
            style={
              quantity === 1 ? { cursor: "not-allowed" } : { cursor: "pointer" }
            }
          >
            -
          </button>
          <div className="cart-quantity">{props.item.quantity}</div>
          <button
            className="increment"
            onClick={() => {
              props.increment(props.item.id);
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="cart-right">
        <p className="subtotal">Subtotal:</p>
        <p className="sub-amount">
          Php {props.item.price * props.item.quantity}.00
        </p>
      </div>
      <button
        className="remove-button"
        onClick={() => {
          props.removeToCart(props.item.id);
        }}
      >
        x
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: (id) => dispatch({ type: "INCREMENT", payload: id }),
    decrement: (id) => dispatch({ type: "DECREMENT", payload: id }),
    removeToCart: (id) => dispatch({ type: "REMOVE_TO_CART", payload: id }),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
