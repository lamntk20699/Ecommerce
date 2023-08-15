import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Product from "./Product";
// import Paginaiton from "../Pagination/Pagination";
import { Products } from "../../data/Products";
import {
  fetchAllProducts,
  fetchProductList,
} from "../../react-redux/actions/productActions";
import * as selectors from "../../react-redux/selectors";

const ProductList = (props) => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    totalRows: 21,
  });
  // props.productItemList
  const productItemList = props.productItemList || Products;
  const { fetchProductList, fetchAllProducts } = props;
  // const containerStyle = {
  //   margin
  // }

  useEffect(() => {
    // fetchProductList(pagination);
    fetchAllProducts();
  }, [pagination]);

  const handlePageChanged = (newPage) => {
    if (pagination.page !== newPage) {
      setPagination({ ...pagination, page: Number(newPage) });
      console.log("New page:", newPage);
    } else {
      console.log("Nochange");
    }
  };

  return (
    <div style={{ margin: "6rem 5rem" }}>
      <div className="grid">
        <div className="row body">
          {productItemList.map((item) => (
            <Product key={item.id} product={item} />
          ))}
        </div>
      </div>
      {/* <Paginaiton pagination={pagination} onPageChanged={handlePageChanged} /> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  const dataSource = selectors.productSelector(state).allProducts;
  console.log(dataSource);
  const searchText = state.filters.searchText.toLowerCase() || "";

  const productItemList = dataSource.filter((product) => {
    return product.productName.toLowerCase().includes(searchText);
  });

  return { productItemList: productItemList };
};

const mapDispatchToProps = (dispatch) => {
  // console.log("ok");
  return {
    fetchProductList: (data) => dispatch(fetchProductList(data)),
    fetchAllProducts: () => dispatch(fetchAllProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
