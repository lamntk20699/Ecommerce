import classNames from "classnames/bind";
import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { fetchProductForOrder } from "../../react-redux/actions/productActions";
import * as selectors from "../../react-redux/selectors";
import CartItem from "../CartPage/CartItem";
import style from "./OrderManageDetail.css";
// import ErrorMessage from "../../module-common/ErrorMessage/ErrorMessage";
import { useLocation, useParams } from "react-router-dom";

const cx = classNames.bind(style);
//let name, note, phone, address, email;
function PostManagePage(props) {
  const { fetchProductForOrder, cartList, orderData } = props;
  // const [info, setInfo] = useState({
  //   name: "",
  //   note: "",
  //   phone: "",
  //   address: "",
  //   email: "",
  // });
  const [total, setTotal] = useState("0");
  const [state, setState] = useState("pending");
  const [createdAt, setCreatedAt] = useState(null);

  const { orderId } = useParams();
  console.log("aalll: ", orderData[0] && orderData[0].id);
  const info = React.useMemo(() => {
    const data = Array.isArray(orderData)
      ? orderData.filter((item) => item.id === Number.parseInt(orderId))
      : [];
    return data[0] || {};
  }, [orderData, orderId]);

  const getProductData = () => {
    try {
      const result = JSON.parse(info.products);
      console.log("result", result);
      return result.map((item) => {
        const productData = cartList.filter(
          (productItem) => productItem.id === item.product
        );
        if (productData.length > 0)
          return {
            productImage: productData[0].productImage,
            productName: productData[0].productName,
            productPrice: productData[0].productPrice,
            quantity: item.quantity,
            id: item.product,
          };
        return {};
      });
    } catch (error) {
      return [];
    }
  };

  // useEffect(() => {
  //   try {
  //     axios.get(`/api/orders/${pathname}`).then((response) => {
  //       console.log(response.data);
  //       // let temp = response.data.shippingDetails;
  //       // name = temp.name;
  //       // note = temp.note;
  //       // phone = temp.phone;
  //       // address = temp.address;
  //       // email = temp.email;
  //       setInfo(response.data.shippingDetails);
  //       setOrderItem(response.data);
  //       fetchProductForOrder(response.data.products);
  //       setTotal(response.data.total);
  //       setState(response.data.state);
  //       setCreatedAt(response.data.createdAt);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);
  console.log("productOrder: ", cartList);
  // const { cartList, quantity, fetchCartList } = props;
  const pathname = useLocation().pathname.slice(12);
  const [orderItem, setOrderItem] = useState({});
  console.log("path: ", pathname);
  //   const history = useHistory();

  console.log(orderItem);
  // console.log(Object.keys(orderItem));
  // const { name, note, phone, address, email } = orderItem.shippingDetails;

  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const noteRef = useRef();

  // const total =
  //   cartList?.reduce(
  //     (prev, curr) => prev + curr.quantity * +curr.productPrice,
  //     0
  //   ) || 0;
  // const userInfomation = JSON.parse(localStorage.getItem("userInfo"));

  const submitHandler = async (e) => {};
  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   const name = nameRef.current.value;
  //   const phone = phoneRef.current.value;
  //   const email = emailRef.current.value;
  //   const address = addressRef.current.value;
  //   const note = noteRef.current.value;
  //   const products = cartList.map((item) => ({
  //     product: item.id,
  //     quantity: item.quantity,
  //   }));
  //   if (!name || !phone || !email || !address) {
  //     setMessage("Vui lòng nhập tất cả các trường cần thiết!");
  //   } else {
  //     const order = {
  //       userID: userInfomation.id,
  //       shippingDetails: {
  //         name,
  //         phone,
  //         email,
  //         address,
  //         note,
  //       },
  //       products,
  //       total,
  //     };

  //     console.log("order", order);

  //     await axios.post("/api/orders", order);
  //     history.push("/user/order");
  //     setMessage(null);
  //   }
  // };
  return (
    <>
      {/* <Headers></Headers> */}
      <div className={cx("grid", "body")}>
        {/* {message && <ErrorMessage variant="danger">{message}</ErrorMessage>} */}
        <form>
          <div>
            <h4 className={cx("body__title")}>Đặt hàng</h4>
            <div className={cx("body__item")}>
              <p className={cx("body__item__title")}>Họ và tên: </p>
              <input
                ref={nameRef}
                className={cx("body__item__input")}
                type="text"
                placeholder="Họ và tên"
                value={info.name}
                readOnly
              />
            </div>
            <div className={cx("body__item")}>
              <p className={cx("body__item__title")}>Số điện thoại: </p>
              <input
                ref={phoneRef}
                className={cx("body__item__input")}
                type="text"
                placeholder="Số điện thoại"
                value={info.phoneNumber}
                readOnly
              />
            </div>
            <div className={cx("body__item")}>
              <p className={cx("body__item__title")}>Email: </p>
              <input
                ref={emailRef}
                className={cx("body__item__input")}
                type="text"
                placeholder="Email"
                value={info.email}
                readOnly
              />
            </div>
            <div className={cx("body__item")}>
              <p className={cx("body__item__title")}>Địa chỉ: </p>
              <input
                ref={addressRef}
                className={cx("body__item__input")}
                type="text"
                placeholder="Địa chỉ"
                value={info.address}
                readOnly
              />
            </div>
            <div className={cx("body__item")}>
              <p className={cx("body__item__title")}>Ngày tạo đơn hàng: </p>
              <input
                //ref={addressRef}
                className={cx("body__item__input")}
                type="text"
                placeholder="Date time"
                value={info.date_order}
                readOnly
              />
            </div>
            <div className={cx("body__item")}>
              <p className={cx("body__item__title")}>Trạng thái: </p>
              <input
                //ref={addressRef}
                className={cx("body__item__input")}
                type="text"
                placeholder="Trạng thái"
                value={info.state}
                readOnly
              />
              {/* <select
                className={cx("body__item__input")}
                defaultValue="pending"
              >
                <option value="pending">pending</option>
                <option value="processing">processing</option>
                <option value="shipped">shipped</option>
                <option value="delivered">delivered</option>
                <option value="decided">decided</option>
              </select> */}
            </div>
            <div className={cx("body__item")}>
              <p className={cx("body__item__title")}>Ghi chú: </p>
              <textarea
                ref={noteRef}
                className={cx("body__item__text-area")}
                id=""
                cols="100"
                rows="10"
                placeholder="Ghi chú"
                value={info.note}
                readOnly
              ></textarea>
            </div>

            {/* <button className={cx("btn_order")} onClick={submitHandler}>
              UPDATE
            </button> */}
          </div>
          <div style={{ marginTop: "60px" }}>
            <h1 className={cx("body__title")}>Products</h1>
            <div>
              {getProductData()
                ? getProductData().map((item) => (
                    <CartItem
                      key={item.id}
                      product={item}
                      // orderQuantity={item.quantity}
                      editable={false}
                    />
                  ))
                : null}
            </div>
          </div>
          <div className={cx("total")}>
            <h1>Tổng tiền: {info.total}₫</h1>
          </div>
        </form>
      </div>
    </>
  );
}

// const mapStateToProps = (state) => {
//   const data = selectors.cartSelector(state);
//   // const test = selectors.productSelector(state);
//   // console.log("product: ",test);
//   console.log("cart: ", data);

//   return { cartList: data.cartList, quantity: data.cartTotalQuantity };
// };

// const mapDispatchToProps = (dispatch) => {
//   console.log("ok");
//   return {
//     fetchCartList: (data) => dispatch(fetchCartList(data)),
//   };
// };
const mapStateToProps = (state) => {
  const data = selectors.productSelector(state);
  const orderList = selectors.orderSelector(state);
  console.log("dada: ", data);
  return { cartList: data.allProducts, orderData: orderList.orders || [] };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // addProductToCart: (product) => dispatch(addProductToCart(product)),
    fetchProductForOrder: (productId) =>
      dispatch(fetchProductForOrder(productId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostManagePage);
