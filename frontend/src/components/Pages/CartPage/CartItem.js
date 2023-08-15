import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../react-redux/actions/cartActions";
import "./CartItem.css";

const CartItem = (props) => {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeProductFromCart,
    editable,
    product = {},
  } = props;
  const { productImage, productName, productPrice, quantity, id } = product;

  const [quantityState, setQuantityState] = useState(quantity);

  // const handleIncreaseClicked = ()

  return (
    <div className="cart-item-container">
      <div style={{ width: "19%" }} className="cart-item-image">
        <Link to={`/product/${id}`}>
          <img src={productImage || ""} alt=""></img>
        </Link>
      </div>
      <div style={{ width: "28%" }}>
        <Link to={`/product/${id}`}>
          <div className="cart-item-info">
            <div className="item-name">{productName}</div>
            <div className="item-size">Size: 35</div>
          </div>
        </Link>
      </div>
      <div style={{ width: "17%" }}>
        <div className="cart-item-price">{productPrice}₫</div>
      </div>
      <div style={{ width: "18%" }}>
        <div className="cart-item-quantity">
          {editable && (
            <button
              type="button"
              className="item-quantity-btn decrease"
              onClick={() => {
                setQuantityState((prev) => prev - 1);
                decreaseQuantity(id, -1);
              }}
            >
              -
            </button>
          )}
          <div className="item-quantity">{quantityState}</div>
          {editable && (
            <button
              type="button"
              className="item-quantity-btn increase"
              onClick={() => {
                setQuantityState((prev) => prev + 1);
                increaseQuantity(id, 1);
              }}
            >
              +
            </button>
          )}
        </div>
      </div>
      <div style={{ width: "13%" }}>
        <div className="cart-item-sum">
          {Number(productPrice) * Number(quantity)}₫
        </div>
      </div>
      <div style={{ width: "5%" }}>
        <div className="cart-item-remove">
          {editable && (
            <button
              type="button"
              className="item-remove-btn"
              onClick={() => removeProductFromCart(id)}
            >
              <i className="fa-solid fa-trash-can fa-xs"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    increaseQuantity: (productID, quantity) =>
      dispatch(actions.increaseQuantity({ id: productID, quantity })),
    decreaseQuantity: (productID, quantity) =>
      dispatch(actions.decreaseQuantity({ id: productID, quantity })),
    removeProductFromCart: (productID) =>
      dispatch(actions.removeProductFromCart(productID)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
