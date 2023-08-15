import * as types from "./actionTypes";

export const searchFilterChanged = (searchText) => ({
  type: types.SEARCH_FILTER_CHANGED,
  payload: searchText,
});

export const brandFilterChanged = (brands) => ({
  type: types.BRAND_FILTER_CHANGED,
  payload: brands,
});

export const saleFilterChanged = (sale) => ({
  type: types.SALE_FILTER_CHANGED,
  payload: sale,
});
