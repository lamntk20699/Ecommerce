import Button from "../../module-common/common/Button/Button";

function PostManagePage() {
  return (
    <>
      {/* <Headers></Headers> */}
      <div className={"page__body"}>
        <h4 className={"body__title"}>Thêm sản phẩm</h4>
        <form method="POST" action="/api/product/create">
          <div className={"body__item"}>
            <p className={"body__item__title"}>Tên sản phẩm: </p>
            <input
              className={"body__item__input"}
              type="text"
              placeholder="Tên sản phẩm"
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
              name="productCategory"
              id="productCategory"
            />
          </div>
          <Button size="big" status="primary" title="Thêm bài viết"></Button>
        </form>
      </div>
    </>
  );
}

export default PostManagePage;
