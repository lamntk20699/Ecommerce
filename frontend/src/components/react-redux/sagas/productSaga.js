import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import * as types from "../actions/actionTypes";

//Async functions
async function fetchAll() {
  try {
    const response = await axios.get("/api/product/all");
    console.log("axios res: ", response);
    if (response && response.data) {
      return response.data;
    } else return [];
  } catch (err) {
    console.log("err");
    console.log();
    return "Failed";
  }
}

// async function fetchSingle(productId) {
//   try {
//     const response = await axios.get(`/api/product/${productId}`);
//     console.log("axios res: ", response);
//     if (response && response.data.products) {
//       return response.data.products;
//     } else return [];
//   } catch (err) {
//     console.log("err");
//     console.log();
//     return "Failed";
//   }
// }

async function fetchData(pagination) {
  try {
    const response = await axios.post("/api/product", { pagination });
    console.log("axios res: ", response);
    if (response && response.data.products) {
      return response.data.products;
    } else return [];
  } catch (err) {
    console.log("err");
    console.log();
    return "Failed";
  }
}

async function getSingleProduct(productId) {
  try {
    const response = await axios.get(`/api/product?productId=${productId}`);
    console.log(response);
    if (response && response.data) {
      return response.data;
    } else return {};
  } catch (err) {
    console.log("err???", err);
    console.log();
  }
}

//Workers
export function* fetchProductList(action) {
  console.log("Payload: ", action.payload);
  const response = yield call(fetchData, action.payload);
  console.log("fetch data: ", response);
  yield put({ type: types.SET_PRODUCT_LIST, payload: response });
}

export function* getProductDetail(action) {
  const response = yield call(getSingleProduct, action.payload);
  console.log("fetch data: ", response);
  yield put({ type: types.SET_SINGLE_PRODUCT, payload: response });
}

export function* fetchAllProducts() {
  // console.log("Payload: ", action.payload);
  const response = yield call(fetchAll);
  console.log("fetch data: ", response);
  yield put({ type: types.SET_ALL_PRODUCTS, payload: response });
}

export function* fetchProductForOrder(action) {
  // console.log("Payload: ", action.payload);
  const fetchListTemp = action.payload;
  let tempProductList = [];
  let tempItem;
  for (const item of fetchListTemp) {
    tempItem = yield call(getSingleProduct, item.product);
    tempProductList.push({ ...tempItem, quantity: item.quantity });
  }
  console.log("proLis: ", tempProductList);
  // const response = yield call(fetchSingle, action.payload);
  // console.log("fetch data: ", response);
  yield put({ type: types.SET_PRODUCT_FOR_ORDER, payload: tempProductList });
}

//Watchers
function* watchFetchProductList() {
  yield takeLatest(types.FETCH_PRODUCT_LIST, fetchProductList);
}

function* watchGetProductDetail() {
  yield takeLatest(types.GET_SINGLE_PRODUCT, getProductDetail);
}

function* watchFetchAllProducts() {
  yield takeLatest(types.FETCH_ALL_PRODUCTS, fetchAllProducts);
}

function* watchFetchProductForOrder() {
  yield takeLatest(types.FETCH_PRODUCT_FOR_ORDER, fetchProductForOrder);
}

//rootSaga
export default function* productSaga() {
  yield all([
    watchFetchProductList(),
    watchGetProductDetail(),
    watchFetchAllProducts(),
    watchFetchProductForOrder(),
  ]);
}
