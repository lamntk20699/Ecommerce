import * as types from "../actions/actionTypes";
// import * as shoes from "../../data/ImageShoe";
// import { Products } from "../../data/Products";

// const initialState = {
//   productList: [
//     {
//       id: 1,
//       name: "Shoe_01 is the best shoe I have in the store",
//       url: shoes.SHOE_01,
//     },
//     { id: 2, name: "Shoe_02", url: shoes.SHOE_02 },
//     { id: 3, name: "Shoe_03", url: shoes.SHOE_03 },
//     { id: 4, name: "Shoe_04", url: shoes.SHOE_04 },
//     { id: 5, name: "Shoe_05", url: shoes.SHOE_05 },
//     { id: 6, name: "Shoe_06", url: shoes.SHOE_06 },
//     { id: 7, name: "Shoe_07", url: shoes.SHOE_07 },
//     { id: 9, name: "Shoe_08", url: shoes.SHOE_08 },
//     { id: 10, name: "Shoe_08", url: shoes.SHOE_08 },
//     { id: 11, name: "Shoe_08", url: shoes.SHOE_08 },
//   ],
// };

const initialState = {
  productList: [],
  product: {},
  allProducts: [],
  productOrder: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
      };
    case types.ADD_PRODUCT:
      return {
        ...state,
        productList: [...state.productList, action.payload],
      };
    case types.SET_SINGLE_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case types.SET_ALL_PRODUCTS: {
      return {
        ...state,
        allProducts: action.payload,
      };
    }
    case types.SET_PRODUCT_FOR_ORDER: {
      return {
        ...state,
        productOrder: action.payload,
      };
    }
    default:
      return state;
  }
};

export default productReducer;
