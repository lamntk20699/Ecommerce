import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchCartList } from "../../react-redux/actions/cartActions";
import * as selectors from "../../react-redux/selectors";
import CartItem from "../CartPage/CartItem";
// import Button from "../../module-common/common/Button/Button";
import axios from "axios";
import Cookies from "js-cookie";
import { fetchAllProducts } from "../../react-redux/sagas/productSaga";

function PostManagePage(props) {
  const {
    cartList,
    quantity,
    fetchCartList,
    fetchAllProducts,
    userInfo = {},
  } = props;
  const { name, email, phoneNumber, address } = userInfo;
  const history = useHistory();
  useEffect(() => {
    // fetchAllProducts();
    fetchCartList();
  }, []);
  // console.log(cartList);

  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const noteRef = useRef();

  const total =
    cartList?.reduce(
      (prev, curr) => prev + curr.quantity * +curr.productPrice,
      0
    ) || 0;
  // const userInfomation = JSON.parse(localStorage.getItem("userInfo"));

  const submitHandler = async (e) => {
    e.preventDefault();
    const newName = nameRef.current.value;
    const phone = phoneRef.current.value;
    const newEmail = emailRef.current.value;
    const newAddress = addressRef.current.value;
    const note = noteRef.current.value;
    const products = cartList.map((item) => ({
      product: item.id,
      quantity: item.quantity,
    }));
    if (!name || !phone || !address) {
      alert(
        "Vui lòng nhập đầy đủ thông tin (Họ và tên, Số điện thoại, Địa chỉ nhận)"
      );
      return;
    }

    if (products.length === 0) {
      alert("Vui lòng chọn sản phẩm vào giỏ hàng");
      return;
    }

    const order = {
      name: newName,
      phoneNumber: phone,
      email: newEmail,
      address: newAddress,
      state: "Đã nhận đơn",
      note,
      products: JSON.stringify(products),
      total,
    };

    console.log("order", order);

    try {
      const response = await axios.post(
        "/api/orders",
        { ...order },
        {
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        }
      );
      console.log("réponse: ", response);
    } catch (err) {
      console.log(err);
    }
    history.push("/user/order");
  };
  return (
    <>
      {/* <Headers></Headers> */}
      <div className={"page_body"}>
        <form>
          <div>
            <h4 className={"body__title"}>Đặt hàng</h4>
            <div className={"body__item"}>
              <p className={"body__item__title"}>Họ và tên: </p>
              <input
                ref={nameRef}
                className={"body__item__input"}
                type="text"
                placeholder="Họ và tên"
                defaultValue={name && name}
                // defaultValue={userInfomation.fullName}
              />
            </div>
            <div className={"body__item"}>
              <p className={"body__item__title"}>Số điện thoại: </p>
              <input
                ref={phoneRef}
                className={"body__item__input"}
                type="text"
                placeholder="Số điện thoại"
                defaultValue={phoneNumber && phoneNumber}
              />
            </div>
            <div className={"body__item"}>
              <p className={"body__item__title"}>Email: </p>
              <input
                ref={emailRef}
                className={"body__item__input"}
                type="text"
                placeholder="Email"
                defaultValue={email && email}
              />
            </div>
            <div className={"body__item"}>
              <p className={"body__item__title"}>Địa chỉ: </p>
              <input
                ref={addressRef}
                className={"body__item__input"}
                type="text"
                placeholder="Địa chỉ"
                defaultValue={address && address}
              />
            </div>
            <div className={"body__item"}>
              <p className={"body__item__title"}>Ghi chú: </p>
              <textarea
                ref={noteRef}
                className={"body__item__text-area"}
                id=""
                cols="100"
                rows="10"
                placeholder="Ghi chú"
              ></textarea>
            </div>

            <button className={"btn_order"} onClick={submitHandler}>
              Đặt hàng
            </button>
          </div>
          <div style={{ marginTop: "60px" }}>
            <h1 className={"body__title"}>Products</h1>

            <div>
              {cartList.map((item) => (
                <CartItem key={item.id} product={item} editable={false} />
              ))}
            </div>
          </div>
          <div className={"total"}>
            <h1>Tổng tiền: {total}</h1>
          </div>
        </form>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const data = selectors.cartSelector(state);
  const userInfo = selectors.meSelector(state);
  // const test = selectors.productSelector(state);
  // console.log("product: ",test);
  console.log("cart: ", data);

  return {
    cartList: data.cartList,
    quantity: data.cartTotalQuantity,
    userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("ok");
  return {
    fetchCartList: (data) => dispatch(fetchCartList(data)),
    fetchAllProducts: (data) => dispatch(fetchAllProducts(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostManagePage);
