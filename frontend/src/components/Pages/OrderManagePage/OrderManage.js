import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  deleteOrderAction,
  listOrders,
} from "../../react-redux/actions/ordersListAction";

const OrderList = () => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const history = useHistory();

  useEffect(() => {
    dispatch(listOrders());
    // if (!userInfo) {
    //   history.push("/login");
    // }
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? This action can't be reverse!")) {
      dispatch(deleteOrderAction(id));
    }
  };
  return (
    <>
      {/* <Header /> */}
      {/* {console.log(orders)} */}
      <div className="cart-container">
        {/* {error && <ErrorMessage variant="danger">{error} </ErrorMessage>} */}
        {/* {!loading && message && (
          <ErrorMessage variant="danger">{message}</ErrorMessage>
        )} */}
        {/* {loading && <Loading />} */}
        <div className="cart-head">
          <div style={{ width: "28%" }}>Mã đơn hàng</div>
          <div style={{ width: "20%" }}>Thời điểm đặt hàng</div>
          <div style={{ width: "28%" }}>Trạng thái đơn hàng</div>
          <div style={{ width: "14%" }}>Đơn giá</div>
          {/* <div style={{ width: "5%" }}>Xóa</div> */}
          <div style={{ width: "10%" }}>Chi tiết</div>
        </div>
        <div className="cart-body ">
          {orders?.map((order, index) => (
            <div className="cart-item-container" key={index}>
              <div style={{ width: "28%" }}>
                <div>{order.id}</div>
              </div>
              <div style={{ width: "20%" }}>
                <div>{order.date_order}</div>
              </div>
              <div style={{ width: "28%" }}>
                <div>{order.state}</div>
              </div>
              <div style={{ width: "14%" }}>
                <div className="cart-item-price">{order.total}đ</div>
              </div>
              {/* <div style={{ width: "5%" }} className="align-items-center">
                <button
                  type="button"
                  className="item-remove-btn"
                  onClick={() => deleteHandler(order.id)}
                >
                  <i className="fa-solid fa-trash-can fa-xs"></i>
                </button>
              </div> */}
              <div style={{ width: "10%" }} className="align-items-center">
                <Link to={`/user/order/${order.id}`}>
                  <button type="button" className="item-remove-btn">
                    <i className="fa-solid fa-edit fa-xs"></i>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-footer">
          <div className="cart-info">
            {/* <span className="cart-footer-title">Total:&nbsp;&nbsp;&nbsp;</span> */}
            {/* <span className="cart-total-price">{total}&nbsp;₫</span> */}
          </div>
          <div className="cart-btn">
            {/* <Link to={"/"}>
              <button type="button" className="cart-btn back-btn">
                Tiếp tục mua hàng
              </button>
            </Link>
            <Link to={"/login"}>
              <button type="button" className="cart-btn buy-btn">
                Tiến hành đặt hàng
              </button>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
