import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCartList } from "../../react-redux/actions/cartActions";
import { fetchAllProducts } from "../../react-redux/actions/productActions";
import * as selectors from "../../react-redux/selectors";
import CartItem from "./CartItem";
import "./CartPage.css";

const CartPage = (props) => {
  const { cartList = [], quantity, fetchCartList, fetchAllProducts } = props;
  const init = 0;
  const total = cartList
    ? cartList.reduce(
        (prev, curr) => prev + curr.quantity * curr.productPrice,
        init
      )
    : 0;

  useEffect(async () => {
    // await fetchAllProducts();
    await fetchCartList();
  }, []);

  console.log(quantity);

  return (
    <>
      {/* <Header /> */}
      <div className="cart-container">
        <div className="cart-head">
          <div style={{ width: "19%" }}>Sản phẩm</div>
          <div style={{ width: "28%" }}>Thông tin sản phẩm</div>
          <div style={{ width: "17%" }}>Đơn giá</div>
          <div style={{ width: "18%" }}>Số lượng</div>
          <div style={{ width: "13%" }}>Thành tiền</div>
          <div style={{ width: "5%" }}>Xóa</div>
        </div>
        <div className="cart-body">
          {cartList.map((item) => (
            <CartItem key={item.id} product={item} editable={true} />
          ))}
        </div>
        <div className="cart-footer">
          <div className="cart-info">
            <span className="cart-footer-title">Total:&nbsp;&nbsp;&nbsp;</span>
            <span className="cart-total-price">{total}&nbsp;₫</span>
          </div>
          <div className="cart-btn">
            <Link to={"/"}>
              <button type="button" className="cart-btn back-btn">
                Tiếp tục mua hàng
              </button>
            </Link>
            <Link to={"/user/payment"}>
              <button type="button" className="cart-btn buy-btn">
                Tiến hành đặt hàng
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const data = selectors.cartSelector(state);
  // const test = selectors.productSelector(state);
  // console.log("product: ",test);
  console.log("cart: ", data);

  return { cartList: data.cartList, quantity: data.cartTotalQuantity };
};

const mapDispatchToProps = (dispatch) => {
  console.log("ok");
  return {
    fetchCartList: (data) => dispatch(fetchCartList(data)),
    fetchAllProducts: () => dispatch(fetchAllProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
