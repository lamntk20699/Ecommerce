import { applyMiddleware, combineReducers, createStore } from "redux";
import cartReducer from "./reducers/cartReducers";
import filterReducer from "./reducers/filterReducer";
import meReducer from "./reducers/meReducers";
import productReducer from "./reducers/productReducers";

import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import {
  orderDeleteReducer,
  orderListReducer,
  orderListReducerAdmin,
  orderUpdateReducer,
} from "./reducers/orderListReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import rootSaga from "./sagas/rootSaga";

const rootReducer = combineReducers({
  cart: cartReducer,
  filters: filterReducer,
  products: productReducer,
  userInfo: meReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderListAdmin: orderListReducerAdmin,
  orderUpdate: orderUpdateReducer,
});

// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;
const initialState = {
  //   userLogin: { userInfo: userInfoFromStorage },
};

const sagaMiddleware = createSagaMiddleware();

const middleWares = [sagaMiddleware, thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWares))
);

sagaMiddleware.run(rootSaga);

export default store;
