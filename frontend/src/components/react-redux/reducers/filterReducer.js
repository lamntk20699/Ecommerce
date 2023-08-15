import * as types from "../actions/actionTypes";

const initialState = {
  searchText: "",
  brands: [],
  sale: "",
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH_FILTER_CHANGED:
      return {
        ...state,
        searchText: action.payload,
      };
    case types.BRAND_FILTER_CHANGED:
      return {
        ...state,
        brand: action.payload,
      };
    case types.SALE_FILTER_CHANGED:
      return {
        ...state,
        sale: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
