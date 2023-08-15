import Cookies from "js-cookie";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

import axios from "axios";

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const {
      config: { data },
    } = await axios.post(
      "/admin/login/?next=/admin",
      {
        username,
        password,
        // csrfmiddlewaretoken:
        //   "Bujc7v4ZTzDal7p1BdB5E3GobyTgf4sCZiSsljV7jfFI0DLwiiVfch14NoTGBu4s",
      },
      config
    );
    // console.log("sssss: ", data, JSON.stringify(data), JSON.parse(data));
    dispatch({ type: USER_LOGIN_SUCCESS, payload: JSON.parse(data) });
    localStorage.setItem("userInfo", data);
    dispatch(
      { type: "GET_CART_FROM_DB", payload: { userId: data.id } },
      config
    );
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  const response = await axios.post("/api/users/logout");
  console.log(response);
  dispatch({ type: USER_LOGOUT });
};

export const register = (userName, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      {
        userName,
        email,
        password,
      },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    //Take userLogin information from state
    const {
      userLogin: { userInfo },
    } = getState();

    //Pass information to update + auth token
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("api/users/profile", user, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
