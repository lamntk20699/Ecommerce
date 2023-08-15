import * as types from "./actionTypes";

export const fetchUserInfo = () => ({
  type: types.GET_USER_INFO,
});

export const setUserInfo = (payload) => ({
  type: types.SET_USER_INFO,
  payload: payload,
});

export const updateUserInfo = (payload) => ({
  type: types.UPDATE_USER_INFO,
  payload: payload,
});
