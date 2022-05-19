import * as types from "./actionTypes";

export const loadUsersStart = () => ({
  type: types.LOAD_USERS_START,
});

export const loadSingleUsersStart = (userId) => ({
  type: types.GET_SINGLE_USER_START,
  payload: userId,
});

export const loadUsersSuccess = (users) => ({
  type: types.LOAD_USERS_SUCCESS,
  payload: users,
});

export const loadSingleUsersSuccess = (users) => ({
  type: types.GET_SINGLE_USER_SUCCESS,
  payload: users,
});

export const loadUsersError = (error) => ({
  type: types.LOAD_USERS_ERROR,
  payload: error,
});

export const loadSingleUsersError = (error) => ({
  type: types.GET_SINGLE_USER_ERROR,
  payload: error,
});

export const createUserStart = (user) => ({
  type: types.CREATE_USER_START,
  payload: user,
});

export const createUserSuccess = () => ({
  type: types.CREATE_USER_SUCCESS,
});

export const createUserError = (error) => ({
  type: types.CREATE_USER_ERROR,
  payload: error,
});

export const deleteUserStart = (userId) => ({
  type: types.DELETE_USER_START,
  payload: userId,
});

export const deleteUserSuccess = (userId) => ({
  type: types.DELETE_USER_SUCCESS,
  payload: userId,
});

export const deleteUserError = (error) => ({
  type: types.DELETE_USER_ERROR,
  payload: error,
});

export const updateUserStart = (userInfo) => ({
  type: types.UPDATE_USER_START,
  payload: userInfo,
});

export const updateUserSuccess = () => ({
  type: types.UPDATE_USER_SUCCESS,
});

export const updateUserError = (error) => ({
  type: types.UPDATE_USER_ERROR,
  payload: error,
});

export const loadUsersByIDStart = (users) => ({
  type: types.LOAD_USERS_BY_ID_START,
  payload: users,
});

export const loadUsersByIDSuccess = (users) => ({
  type: types.LOAD_USERS_BY_ID_SUCCESS,
  payload: users,
});

export const loadUsersByIDError = (error) => ({
  type: types.LOAD_USERS_BY_ID_ERROR,
  payload: error,
});

export const logoutUser = () => ({
  type: types.LOGOUT_USER_START,
});

export const logoutUserSuccess = (error) => ({
  type: types.LOGOUT_USER_SUCCESS,
});

export const loadProductsStart = () => ({
  type: types.LOAD_PRODUCTS_START,
});

export const loadProductsSucess = (products) => ({
  type: types.LOAD_PRODUCTS_SUCCESS,
  payload: products,
});

export const loadProductsError = (error) => ({
  type: types.LOAD_PRODUCTS_ERROR,
  payload: error,
});

export const loadSingleProductStart = (productId) => ({
  type: types.LOAD_SINGLE_PRODUCT_START,
  payload: productId,
});

export const loadSingleProductSuccess = (product) => ({
  type: types.LOAD_SINGLE_PRODUCT_SUCCESS,
  payload: product,
});

export const loadSingleProductError = (error) => ({
  type: types.LOAD_SINGLE_PRODUCT_ERROR,
  payload: error,
});

export const addCardStart = (payload) => ({
  type: types.ADD_CART_START,
  payload: payload,
});

export const addCard = (payload) => ({
  type: types.ADD_CART,
  payload: payload,
});

export const deleteCartstart = (payload) => ({
  type: types.DELETE_CART_START,
  payload: payload,
});

export const deleteCart = (payload) => ({
  type: types.DELETE_CART,
  payload: payload,
});
