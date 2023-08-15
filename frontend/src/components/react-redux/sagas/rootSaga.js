import { spawn } from "redux-saga/effects";
import cartSaga from "./cartSaga";
import meSaga from "./meSaga";
import productSaga from "./productSaga";

export default function* rootSaga() {
  yield spawn(cartSaga);
  yield spawn(productSaga);
  yield spawn(meSaga);
}
