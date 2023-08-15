import axios from "axios";
import Cookies from "js-cookie";
import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import * as selectors from "../../react-redux/selectors";
import * as types from "../actions/actionTypes";
import { fetchAllProducts } from "./productSaga";

export function convertToString(arr) {
  const temp = arr.map(
    (item) => `${Object.keys(item)[0]}-${Object.values(item)[0]}`
  );
  return temp.join("/");
}

export function convertStringToArray(str) {
  const arr = str.split("/");
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i].split("-");
    if (!!temp[0] && (!!temp[1] || Number.parseInt(temp[1]) === 0)) {
      result.push({ id: temp[0], quantity: Number.parseInt(temp[1]) });
    }
  }

  return result;
}

//Async function
async function fetchCartData() {
  try {
    const response = await axios.get("/api/cart");
    // console.log("axios res: ", response);
    if (response && response.data) {
      return response.data;
    } else return [];
  } catch (err) {
    console.log("err: ");
    return "Failed";
  }
}

async function fetchCartFromDB(userId) {
  try {
    const response = await axios.post("/api/dbb", { userId });
    console.log("axios res: ", response);
    if (response && response.data.cartList) {
      return response.data.cartList;
    } else return [];
  } catch (err) {
    console.log("err: ");
    return "Failed";
  }
}

async function postCartItem(cartItem) {
  try {
    const response = await axios.post(
      `/api/cart`,
      {
        productId: cartItem.id,
        quantity: cartItem.quantity,
      },
      {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      }
    );
    // console.log("axios res: ", response);
    if (response && response.data) {
      return response.data;
    } else return;
  } catch (err) {
    console.log("err: ", err);
    return;
  }
}

async function deleteCartItem(id) {
  try {
    const response = await axios.delete(`/api/cart?productId=${id}`, {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });
    // console.log("axios res: ", response);
    if (response && response.data) {
      return response.data;
    } else return [];
  } catch (err) {
    console.log("err: ", err);
    return "Failed";
  }
}

async function productQuantityChanged(id, check) {
  try {
    const response = await axios.put(`/api/cart/${check}/${id}`);
    console.log("axios res: ", response);
    if (response && response.data) {
      return response.data;
    } else return [];
  } catch (err) {
    console.log("err: ", err);
    return [];
  }
}

async function postCart(cartItem) {
  const userID = JSON.parse(localStorage.getItem("userInfo")).id;
  try {
    const response = await axios.post("/api/dbb/create", { cartItem, userID });
    console.log("axios res: ", response);
    if (response && response.data) {
      return response.data;
    } else return [];
  } catch (err) {
    console.log("err: ", err);
    return "Failed";
  }
}

//Workers
export function* getCartData() {
  // console.log("Worker!");
  try {
    yield call(fetchAllProducts);
    const response = yield call(fetchCartData);
    if (response) {
      const tempData = JSON.parse(response);
      const products = yield select(selectors.productSelector);
      let cartTotalQuantity = 0;
      let cartList =
        tempData.length > 0
          ? tempData.map((item) => {
              const match = products.allProducts.filter(
                (product) => item.productId === product.id
              );
              cartTotalQuantity += item.quantity;
              if (match[0]) {
                return {
                  id: item.productId,
                  quantity: item.quantity,
                  productImage: match[0].productImage,
                  productPrice: match[0].productPrice,
                };
              }
            })
          : [];

      console.log("fetch data: ", convertStringToArray(response));

      yield put({
        type: types.SET_CART_LIST,
        payload: { cartList: cartList ? cartList : [], cartTotalQuantity },
      });
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

export function* addProductToCart(action) {
  // const cartState = yield select(selectors.cartSelector);
  // const currentCart = cartState.cartList;
  // const newProductId = action.payload.id;
  // const newCart = [];
  // let quantity = 0;
  // let check = true;
  // for (let i = 0; i < currentCart.length; i++) {
  //   if (currentCart[i].id.toString() === newProductId.toString()) {
  //     check = false;
  //     newCart.push({
  //       [currentCart[i].id.toString()]:
  //         currentCart[i].quantity + action.payload.quantity,
  //     });
  //     quantity += currentCart[i].quantity + action.payload.quantity;
  //   } else {
  //     newCart.push({ [currentCart[i].id.toString()]: currentCart[i].quantity });
  //     quantity += Number.parseInt(currentCart[i].quantity);
  //   }
  // }

  // if (check) {
  //   newCart.push({ [newProductId.toString()]: action.payload.quantity });
  // }
  // const data = convertToString(newCart);
  console.log("payload: ", action.payload, Cookies.get("csrftoken"));
  const response = yield call(postCartItem, action.payload);
  // yield call(postCart, action.payload);
  // const response = action.payload;
  console.log("fetch data: ", response || 0);
  // yield put({ type: types.CHANGE_TOTAL_QUANTITY, payload: quantity });
}

export function* removeProductFromCart(action) {
  yield console.log("Delete!");
  const response = yield call(deleteCartItem, action.payload);
  console.log("Data: ", response);
}

export function* handleTotalQuantityChanged(action) {
  // console.log("Changed!");
  // const temp = Number(localStorage.getItem('quantity'));
  yield call(addProductToCart, action);
  // switch (action.type) {
  //   case types.INCREASE_QUANTITY:
  //     const response1 = yield call(
  //       productQuantityChanged,
  //       action.payload,
  //       "increase"
  //     );
  //     console.log(response1);
  //     break;
  //   case types.DECREASE_QUANTITY:
  //     const response2 = yield call(
  //       productQuantityChanged,
  //       action.payload,
  //       "decrease"
  //     );
  //     console.log(response2);
  //     break;
  //   default:
  //     console.log("Nothing!");
  // }
}

export function* getCartFromDB(action) {
  console.log("Testing!: ", action.payload);
  const response = yield call(fetchCartFromDB, action.payload);
  console.log("fetch data: ", response);
  // yield put({ type: types.SET_CART_LIST, payload: response });
}

//Watchers
function* watchFetchCartList() {
  yield takeLatest(types.FETCH_CART_LIST, getCartData);
}
function* watchAddProductToCartList() {
  yield takeEvery(types.ADD_TO_CART, addProductToCart);
}
function* watchRemoveProductFromCart() {
  yield takeLatest(types.REMOVE_FROM_CART, removeProductFromCart);
}
function* watchTotalQuantityChanged() {
  yield takeEvery(
    [types.INCREASE_QUANTITY, types.DECREASE_QUANTITY],
    handleTotalQuantityChanged
  );
}
function* watchGetCartFromDB() {
  yield takeLatest("GET_CART_FROM_DB", getCartFromDB);
}

export default function* cartSaga() {
  yield all([
    watchFetchCartList(),
    watchAddProductToCartList(),
    watchRemoveProductFromCart(),
    watchTotalQuantityChanged(),
    watchGetCartFromDB(),
  ]);
}
