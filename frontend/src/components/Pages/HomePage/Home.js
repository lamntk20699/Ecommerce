import React from "react";
// import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import Banner from "../../module-common/Banner/Banner";
import Footer from "../../module-common/Footer/Footer";
import ProductList from "../../module-common/Product/ProductList";
import "./Home.css";

const Home = () => {
  // const userLogin = useSelector((state) => state.userLogin);
  // const { loading, error, userInfo } = userLogin;
  // const history = useHistory();

  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo.permission === "Admin") {
  //     history.push("/admin");
  //   }
  // }, [history, userInfo]);

  return (
    <>
      {/* <Header /> */}
      <div className="home-body">
        <Banner />
        <ProductList />
      </div>
      <Footer />
    </>
  );
};

export default Home;
