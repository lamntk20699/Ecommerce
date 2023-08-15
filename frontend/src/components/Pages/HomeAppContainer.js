import { connect } from "react-redux";

import HomeApp from "./HomeApp";

import { fetchCartList } from "../react-redux/actions/cartActions";
import { fetchUserInfo } from "../react-redux/actions/meActions";
import { listOrders } from "../react-redux/actions/ordersListAction";
import { fetchAllProducts } from "../react-redux/actions/productActions";

const mapStateToProps = (state) => {};

const masDispatchToProps = (dispatch) => {
  return {
    fetchCartList: () => dispatch(fetchCartList()),
    fetchAllProducts: () => dispatch(fetchAllProducts()),
    fetchUserInfo: () => dispatch(fetchUserInfo()),
    fetchDataOrder: () => dispatch(listOrders()),
  };
};

export default connect(mapStateToProps, masDispatchToProps)(HomeApp);
