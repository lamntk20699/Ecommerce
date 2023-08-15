import axios from "axios";
import Cookies from "js-cookie";
import { all, call, put, takeEvery } from "redux-saga/effects";
import * as types from "../actions/actionTypes";
// API
async function callApiGetCustomer() {
  try {
    const response = await axios.get("/api/customer");
    // console.log("axios res: ", response);
    if (response && response.data) {
      return response.data;
    } else return [];
  } catch (err) {
    console.log("err: ");
    return "Failed";
  }
}

async function callApiUpdateCustomer(data) {
  try {
    const response = await axios.post(
      `/api/customer`,
      {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
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
    } else return [];
  } catch (err) {
    console.log("err: ", err);
    return "Failed";
  }
}

//Workers
export function* getUserInfo() {
  try {
    const response = yield call(callApiGetCustomer);
    if (JSON.parse(response)) {
      //   console.log("response: ", JSON.parse(response));
      yield put({
        type: types.SET_USER_INFO,
        payload: JSON.parse(response),
      });
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

export function* updateUserInfo(action) {
  try {
    const response = yield call(callApiUpdateCustomer, action.payload);
    if (response) {
      console.log("response: ", response);
      yield put({
        type: types.SET_USER_INFO,
        payload: response,
      });
    }
  } catch (error) {
    console.log("error: ", error);
  }
}

// Watchers
function* watchFetchUserInfo() {
  yield takeEvery(types.GET_USER_INFO, getUserInfo);
}

function* watchUpdateUserInfo() {
  yield takeEvery(types.UPDATE_USER_INFO, updateUserInfo);
}

export default function* cartSaga() {
  yield all([watchFetchUserInfo(), watchUpdateUserInfo()]);
}
