import * as types from "../actions/actionTypes";

const initialState = {
  cartList: [
    // {
    //   id: 1,
    //   name: "Shoe_01 is the best shoe I have in the store",
    //   url: shoes.SHOE_01,
    //   price: 100000,
    //   quantity: 3,
    // },
    // { id: 2, name: "Shoe_02", url: shoes.SHOE_02, price: 150000, quantity: 4 },
    // { id: 3, name: "Shoe_03", url: shoes.SHOE_03, price: 200000, quantity: 2 },
    // { id: 4, name: "Shoe_04", url: shoes.SHOE_04, price: 300000, quantity: 1 },
  ],
  cartTotalQuantity: 0,
};

// const initialState = {
//   cartList: [],
//   cartTotalQuantity: 0,
// }
// localStorage.setItem('quantity', 0);

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CART_LIST:
      // localStorage.setItem('quantity', action.payload.cartTotalQuantity);
      return {
        ...state,
        cartList: action.payload.cartList || [],
        cartTotalQuantity: action.payload.cartTotalQuantity
          ? action.payload.cartTotalQuantity
          : 0,
      };
    case types.INCREASE_QUANTITY:
      console.log("Increase!");
      let increaseTemp;
      state.cartList.forEach((item) => {
        if (item.id === action.payload) increaseTemp = item.quantity;
      });
      // localStorage.setItem('quantity', increaseTemp < 12 ? state.cartTotalQuantity + 1 : state.cartTotalQuantity);
      return {
        ...state,
        cartList: state.cartList.map((item) =>
          item.id === action.payload
            ? item.quantity < 12
              ? { ...item, quantity: item.quantity + 1 }
              : item
            : item
        ),
        cartTotalQuantity:
          increaseTemp < 12
            ? state.cartTotalQuantity + 1
            : state.cartTotalQuantity,
      };
    case types.DECREASE_QUANTITY:
      console.log("Decrease!");
      let decreaseTemp;
      state.cartList.forEach((item) => {
        if (item.id === action.payload) decreaseTemp = item.quantity;
      });
      // localStorage.setItem('quantity', decreaseTemp > 1 ? state.cartTotalQuantity - 1 : state.cartTotalQuantity);
      return {
        ...state,
        cartList: state.cartList.map((item) =>
          item.id === action.payload
            ? item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
            : item
        ),
        cartTotalQuantity:
          decreaseTemp > 1
            ? state.cartTotalQuantity - 1
            : state.cartTotalQuantity,
      };
    case types.ADD_TO_CART:
      let checkExist =
        state.cartList &&
        state.cartList.find((item) => item.id === action.payload.id);
      if (checkExist) {
        return {
          ...state,
          cartList: state.cartList.map((item) =>
            item.id === checkExist.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartList: [...state.cartList, action.payload],
        };
      }
    case types.REMOVE_FROM_CART:
      let tempIndex = state.cartList.findIndex(
        (item) => item.id === action.payload
      );
      let data =
        tempIndex < 0
          ? state.cartTotalQuantity
          : state.cartTotalQuantity - state.cartList[tempIndex].quantity;
      // localStorage.setItem('quantity', data);
      console.log(data);
      return {
        ...state,
        cartTotalQuantity: data,
        cartList: state.cartList.filter((item) => item.id !== action.payload),
      };
    case types.CHANGE_TOTAL_QUANTITY:
      // localStorage.setItem('quantity', action.payload);
      // console.log(action.payload);
      return {
        ...state,
        cartTotalQuantity: Number(action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
