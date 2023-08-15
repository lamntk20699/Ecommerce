import axios from "axios";
import Cookies from "js-cookie";
import {
  ORDERS_DELETE_FAIL,
  ORDERS_DELETE_REQUEST,
  ORDERS_DELETE_SUCCESS,
  ORDERS_LIST_FAIL,
  ORDERS_LIST_FAIL_ADMIN,
  ORDERS_LIST_REQUEST,
  ORDERS_LIST_REQUEST_ADMIN,
  ORDERS_LIST_SUCCESS,
  ORDERS_LIST_SUCCESS_ADMIN,
  ORDERS_UPDATE_FAIL,
  ORDERS_UPDATE_REQUEST,
  ORDERS_UPDATE_SUCCESS,
} from "../constants/ordersConstants";

export const listOrders = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDERS_LIST_REQUEST,
    });

    //get userInfo from state
    const {
      userLogin: { userInfo },
    } = getState();

    //Sent request to get all note belong to this token to server
    const config = {
      header: {
        "Content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const { data } = await axios.get(`/api/orders`, config);

    //-----------------------
    dispatch({
      type: ORDERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDERS_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteOrderAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDERS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    //Passing to API
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/orders/${id}`, config);

    //-----------------------------------
    dispatch({
      type: ORDERS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDERS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const listOrdersAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDERS_LIST_REQUEST_ADMIN,
    });

    //Sent request to get all note belong to this token to server

    const { data } = await axios.get(`/api/orders`);

    //-----------------------
    dispatch({
      type: ORDERS_LIST_SUCCESS_ADMIN,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDERS_LIST_FAIL_ADMIN,
      payload: message,
    });
  }
};

export const updateOrderAction =
  (id, status, phone, address, note) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDERS_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const updatedOrder = {
        shippingDetails: {
          phone,
          address,
          note,
        },
        status,
      };
      const { data } = await axios.patch(
        `/api/orders/${id}`,
        updatedOrder,
        config
      );

      dispatch({
        type: ORDERS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ORDERS_UPDATE_FAIL,
        payload: message,
      });
    }
  };
