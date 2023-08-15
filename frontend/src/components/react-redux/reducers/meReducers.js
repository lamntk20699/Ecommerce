import * as types from "../actions/actionTypes";

const initialState = {
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
};

const meReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_INFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default meReducer;
