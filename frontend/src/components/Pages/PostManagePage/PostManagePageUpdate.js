import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import Button from "../../module-common/common/Button/Button";
import { getSingleProduct } from "../../react-redux/actions/productActions";
import * as selectors from "../../react-redux/selectors";

function PostManagePage(props) {
  const { getSingleProduct } = props;

  useEffect(() => {
    getSingleProduct(shoeID);
    console.log("ok");
  }, []);

  const location = useLocation().pathname;
  // console.log("location: ", location);

  const shoeID = location.slice(15);
  console.log("shoeId: ", shoeID);

  console.log(props.data);
  const {
    id,
    productName,
    productImage,
    productOldPrice,
    productPrice,
    productDescription,
    productSale,
    productCategory,
  } = props.data;

  return (
    <>
      {/* <Headers></Headers> */}
      <div className={"page__body"}>
        <h4 className={"body__title"}>Cập nhật sản phẩm</h4>
        <form method="POST" action="/api/product/create">
          <div className={"body__item"}>
            <p className={"body__item__title"}>Tên sản phẩm: </p>
            <input
              className={"body__item__input"}
              type="text"
              placeholder="Tên sản phẩm"
              defaultValue={productName}
              id="productName"
              name="productName"
            />
          </div>
          <div className={"body__item"}>
            <p className={"body__item__title"}>Hình ảnh: </p>
            <input
              className={"body__item__input"}
              type="text"
              placeholder="Hình ảnh"
              defaultValue={productImage}
              name="productImage"
              id="productImage"
            />
          </div>
          <div className={"body__item"}>
            <p className={"body__item__title"}>Mô tả: </p>
            <textarea
              className={"body__item__text-area"}
              cols="100"
              rows="10"
              defaultValue={productDescription}
              placeholder="Mô tả sản phẩm"
              id="productDescription"
              name="productDescription"
            ></textarea>
          </div>
          <div className={"body__item"}>
            <p className={"body__item__title"}>Giá tiền: </p>
            <input
              className={"body__item__input"}
              type="text"
              placeholder="Giá tiền"
              defaultValue={productPrice}
              name="productPrice"
              id="productPrice"
            />
            <p className={"body__item__DVT"}>VND</p>
          </div>
          <div className={"body__item"}>
            <p className={"body__item__title"}>Giá tiền cũ: </p>
            <input
              className={"body__item__input"}
              type="text"
              placeholder="Giá tiền cũ"
              defaultValue={productOldPrice}
              name="productOldPrice"
              id="productOldPrice"
            />
            <p className={"body__item__DVT"}>VND</p>
          </div>
          <div className={"body__item"}>
            <p className={"body__item__title"}>Sale: </p>
            <input
              className={"body__item__input"}
              type="text"
              placeholder="Sale"
              defaultValue={productSale}
              name="productSale"
              id="productSale"
            />
          </div>
          <div className={"body__item"}>
            <p className={"body__item__title"}>Danh mục: </p>
            <input
              className={"body__item__input"}
              type="text"
              placeholder="Danh mục"
              defaultValue={productCategory}
              name="productCategory"
              id="productCategory"
            />
          </div>
          <Button
            size="big"
            status="primary"
            title="Cập nhật bài viết"
          ></Button>
        </form>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const data = selectors.productSelector(state);
  // console.log(data);
  return { data: data.product };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (productId) => dispatch(getSingleProduct(productId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostManagePage);
