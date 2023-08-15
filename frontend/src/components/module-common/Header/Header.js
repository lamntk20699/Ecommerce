import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { UilSearch, UilShoppingCartAlt } from "@iconscout/react-unicons";

import { connect, useDispatch, useSelector } from "react-redux";
import { fetchCartList } from "../../react-redux/actions/cartActions";
import { searchFilterChanged } from "../../react-redux/actions/filterActions";
import { fetchAllProducts } from "../../react-redux/actions/productActions";
import { logout } from "../../react-redux/actions/userActions";
import * as selectors from "../../react-redux/selectors";
import "./Header.css";

function Header(props) {
  const [userName, setUserName] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin) || {};
  const { userInfo = null } = userLogin;

  const [searchText, setSearchText] = useState("");
  const { fetchCartList, fetchAllProducts, searchFilterChanged } = props;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  useEffect(() => {
    // fetchAllProducts();
    fetchCartList();
  }, []);
  // let quantity = localStorage.getItem('quantity') || props.quantity;
  let quantity = props.quantity || 0;

  const handleSearchTextChanged = (e) => {
    // console.log(e.target.value);
    setSearchText(e.target.value);
  };

  const handleEnterPressed = (e) => {
    let keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      searchFilterChanged(searchText);
    }
  };

  return (
    <header className={"header"}>
      <div className={"logo"}>
        <Link to="/">
          <img
            className={"logoImg"}
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="amazon-logo"
          />
        </Link>
      </div>
      <div className={"search"}>
        <input
          type="text"
          className={"searchInput"}
          onChange={(e) => handleSearchTextChanged(e)}
          onKeyPress={(e) => handleEnterPressed(e)}
          value={searchText}
        />
        <div
          className={"searchIcon"}
          onClick={() => searchFilterChanged(searchText)}
        >
          <UilSearch size="24" color="#000" />
        </div>
      </div>

      <div className={"userNav"}>
        <Link to="/login" className={"headerNav"}>
          <span className={"headerNavTextFirst"}>Hello,</span>
          <div>
            {userInfo ? (
              <span
                className={"headerNavTextSecond"}
              >{`${userInfo?.username} `}</span>
            ) : (
              <span className={"headerNavTextSecond"}>Sign In</span>
            )}
          </div>
        </Link>
        {userInfo && (
          <ul className={"userSubNav"}>
            <Link to="/profile" className={"headerUserSubnav"}>
              Manage Acount
            </Link>
            <Link to="/user/order" className={"headerUserSubnav"}>
              Your Orders
            </Link>
            {/* <Link to="/user/changepassword" className={'headerUserSubnav'}>
              Change password
            </Link> */}
            <button
              onClick={logoutHandler}
              className={"headerUserSubnav"}
              style={{ textAlign: "left" }}
            >
              Log out
            </button>
          </ul>
        )}
      </div>
      {/* <Link to="/user/order" className={'headerNav'}>
        <span className={'headerNavTextFirst'}>Returns</span>
        <span className={'headerNavTextSecond'}>&amp; Order</span>
      </Link> */}
      <Link to="/cart" className={"headerNav"} style={{ flexDirection: "row" }}>
        <div style={{ position: "relative" }}>
          <span className={"quantity"}>{quantity}</span>
          <UilShoppingCartAlt size="30" color="#fff" />
        </div>
        <span className={"cartText"}>Cart</span>
      </Link>
    </header>
  );
}

const mapStateToPropss = (state) => {
  const quantity = selectors.cartSelector(state).cartTotalQuantity;
  return { quantity: quantity };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchFilterChanged: (searchText) =>
      dispatch(searchFilterChanged(searchText)),
    fetchCartList: () => dispatch(fetchCartList()),
    fetchAllProducts: () => dispatch(fetchAllProducts()),
  };
};

export default connect(mapStateToPropss, mapDispatchToProps)(Header);
