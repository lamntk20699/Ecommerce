import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import CartPage from "./CartPage/CartPage";
import Home from "./HomePage/Home";
import ProductPage from "./ProductPage/ProductPage";
import Profile from "./ProfilePage/ProfilePage";
// import PageManage from "./PageMan/age/PageManage";
import OrderManage from "./OrderManagePage/OrderManage";
// import Category from "./components/Category/Category";
// import PostManagePage from "./PostManagePage/PostManagePageCreate";
import Login from "./LoginPage/Login";
import OrderManageDetail from "./OrderManagePage/OrderManageDetail";
import Payment from "./Payment/Payment";
import Signup from "./SignupPage/Signup";

function HomeApp(props) {
  const { fetchAllProducts, fetchCartList, fetchUserInfo, fetchDataOrder } =
    props;
  const history = useHistory();

  useEffect(() => {
    fetchAllProducts();
    fetchCartList();
    fetchUserInfo();
    fetchDataOrder();
  }, []);

  // useEffect(() => {
  //   if (!Cookies.get("sessionid")) {
  //     history.push("/");
  //   }
  // }, [history]);

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      {/* <Route exact path="/product/create">
    <PostManagePage />
  </Route> */}
      <Route path="/product/:id">
        <ProductPage />
      </Route>
      <Route exact path="/signup123">
        <Signup />
      </Route>
      <Route exact path="/login123">
        <Login />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/user/order/:orderId">
        <OrderManageDetail />
      </Route>

      <Route exact path="/user/order">
        <OrderManage />
      </Route>

      <Route exact path="/user/payment">
        <Payment />
      </Route>
      <Route exact path="/cart">
        <CartPage />
      </Route>
      {/* <Route path="/admin" component={AdminHomePage} /> */}

      {/* <Route exact path="/admin/order">
    <Category />
  </Route> */}
    </Switch>
  );
}

export default HomeApp;
