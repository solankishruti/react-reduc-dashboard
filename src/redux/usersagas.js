import * as types from "./actionTypes";
import {
  take,
  // takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";

import {
  loadUsersSuccess,
  loadUsersError,
  loadUsersByIDSuccess,
  loadUsersByIDError,
  createUserSuccess,
  createUserError,
  deleteUserSuccess,
  deleteUserError,
  updateUserSuccess,
  updateUserError,
  logoutUserSuccess,
  loadSingleUsersSuccess,
  loadSingleUsersError,
  loadProductsSucess,
  loadProductsError,
  loadSingleProductSuccess,
  loadSingleProductError,
  addCard,
  deleteCart,
} from "./actions";
import {
  loadUsersApi,
  createUserApi,
  deleteUserApi,
  updateUserApi,
  loadUsersByIDApi,
  getSingleUserApi,
  loadProductsApi,
  getSingleProductApi,
} from "./api";

function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(loadUsersError(error.response.data));
  }
}
function* onLoadUsersByIDStartAsync({ payload: { email, password } }) {
  try {
    const response = yield call(loadUsersByIDApi, email, password);
    if (response) {
      yield delay(500);
      yield put(loadUsersByIDSuccess(response._tokenResponse.refreshToken));
    }
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      const message = "Please check the Password";
      yield put(loadUsersByIDError(message));
    } else if (error.code === "auth/user-not-found") {
      const message = "Please check the Email";
      yield put(loadUsersByIDError(message));
    } else {
      yield put(loadUsersByIDError(error.message));
    }
  }
}

function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    if (response.status === 201) {
      yield put(createUserSuccess(response.data));
    }
  } catch (error) {
    yield put(createUserError(error.response.data));
  }
}

function* onDeleteUserStartAsync(userId) {
  try {
    const response = yield call(deleteUserApi, userId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  } catch (error) {
    yield put(deleteUserError(error.response.data));
  }
}

function* onUpdateUserStartAsync({ payload: { id, formValue } }) {
  try {
    const response = yield call(updateUserApi, id, formValue);
    if (response.status === 200) {
      yield put(updateUserSuccess());
    }
  } catch (error) {
    yield put(updateUserError(error.response.data));
  }
}
function* onLogOutUsersStartAsync() {
  yield put(logoutUserSuccess());
}

function* onDeleteUser() {
  while (true) {
    const { payload } = yield take(types.DELETE_USER_START);
    if (payload.length) {
      for (let res of payload) {
        yield call(onDeleteUserStartAsync, res);
      }
    } else {
      yield call(onDeleteUserStartAsync, payload);
    }
  }
}

function* onLoadSingleUserStartAsync({ payload }) {
  try {
    const response = yield call(getSingleUserApi, payload);
    console.log(response);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadSingleUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(loadSingleUsersError(error.response.data.error));
  }
}
function* onLoadSingleProductStartAsync({ payload }) {
  try {
    const response = yield call(getSingleProductApi, payload);
    console.log(response);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadSingleProductSuccess(response.data));
    }
  } catch (error) {
    yield put(loadSingleProductError(error.response.data.error));
  }
}

function* onLoadProductStartAsync() {
  try {
    const response = yield call(loadProductsApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadProductsSucess(response.data));
    }
  } catch (error) {
    yield put(loadProductsError(error.response.data));
  }
}

function* onAddtoCart({ payload }) {
  yield put(addCard(payload));
}

function* onDeletetoCart({ payload }) {
  yield put(deleteCart(payload));
}

function* onAddCart() {
  yield takeLatest(types.ADD_CART_START, onAddtoCart);
}

function* onDeleteCart() {
  yield takeLatest(types.DELETE_CART_START, onDeletetoCart);
}

function* onLoadUsers() {
  yield takeLatest(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

function* onLogOutUsers() {
  yield takeLatest(types.LOGOUT_USER_START, onLogOutUsersStartAsync);
}

function* onLoadUsersBYID() {
  yield takeLatest(types.LOAD_USERS_BY_ID_START, onLoadUsersByIDStartAsync);
}

function* onLoadSingleUsers() {
  yield takeLatest(types.GET_SINGLE_USER_START, onLoadSingleUserStartAsync);
}

function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

function* onLoadProducts() {
  yield takeLatest(types.LOAD_PRODUCTS_START, onLoadProductStartAsync);
}

function* onLoadSingleProduct() {
  yield takeLatest(
    types.LOAD_SINGLE_PRODUCT_START,
    onLoadSingleProductStartAsync
  );
}

const userSagas = [
  fork(onLoadUsers),
  fork(onCreateUser),
  fork(onDeleteUser),
  fork(onUpdateUser),
  fork(onLoadUsersBYID),
  fork(onLogOutUsers),
  fork(onLoadSingleUsers),
  fork(onLoadProducts),
  fork(onLoadSingleProduct),
  fork(onAddCart),
  fork(onDeleteCart),
];

export default function* rootSaga() {
  yield all([...userSagas]);
}
