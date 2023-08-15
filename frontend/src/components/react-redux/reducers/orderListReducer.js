import {
  ORDERS_LIST_FAIL,
  ORDERS_LIST_REQUEST,
  ORDERS_LIST_SUCCESS,
  ORDERS_DELETE_REQUEST,
  ORDERS_DELETE_SUCCESS,
  ORDERS_DELETE_FAIL,
  ORDERS_LIST_REQUEST_ADMIN,
  ORDERS_LIST_SUCCESS_ADMIN,
  ORDERS_LIST_FAIL_ADMIN,
  ORDERS_UPDATE_REQUEST,
  ORDERS_UPDATE_SUCCESS,
  ORDERS_UPDATE_FAIL,
} from "../constants/ordersConstants";

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDERS_LIST_REQUEST:
      return { loading: true };
    case ORDERS_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDERS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDERS_DELETE_REQUEST:
      return { loading: true };
    case ORDERS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ORDERS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const orderListReducerAdmin = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDERS_LIST_REQUEST_ADMIN:
      return { loading: true };
    case ORDERS_LIST_SUCCESS_ADMIN:
      return { loading: false, orders: action.payload };
    case ORDERS_LIST_FAIL_ADMIN:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const orderUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDERS_UPDATE_REQUEST:
      return { loading: true };
    case ORDERS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ORDERS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
