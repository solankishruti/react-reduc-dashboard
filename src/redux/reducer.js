import * as types from "./actionTypes";

const initialState = {
  users: [],
  allusers: [],
  loading: false,
  error: null,
  loggedin: null,
  singleUsers: null,
  allProducts: [],
  singleProduct: null,
  numberCart: 0,
  Carts: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_USERS_START:
    case types.GET_SINGLE_USER_START:
    case types.LOAD_SINGLE_PRODUCT_START:
    case types.LOAD_USERS_BY_ID_START:
      return {
        ...state,
        loading: true,
        loggedin: "processing",
      };
    case types.LOGOUT_USER_START:
    case types.ADD_CART_START:
    case types.INCREASE_QUANTITY_START:
    case types.DECREASE_QUANTITY_START:
    case types.DELETE_CART_START:
    case types.CREATE_USER_START:
    case types.DELETE_USER_START:
    case types.LOAD_PRODUCTS_START:
    case types.UPDATE_USER_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOAD_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedin: true,
        users: state.users,
        allusers: action.payload,
        Carts: state.Carts,
      };
    case types.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedin: true,
        users: state.users,
        allProducts: action.payload,
        Carts: state.Carts,
      };
    case types.GET_SINGLE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedin: true,
        users: state.users,
        singleUsers: action.payload,
        allusers: state.allusers,
      };
    case types.LOAD_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedin: true,
        users: state.users,
        singleProduct: action.payload,
        allusers: state.allusers,
        allProducts: state.allProducts,
      };
    case types.LOAD_USERS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        loggedin: true,
        users: action.payload,
      };
    case types.CREATE_USER_SUCCESS:
    case types.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loggedin: false,
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        allusers: state.allusers.filter((item) => item.id !== action.payload),
      };
    case types.LOAD_USERS_ERROR:
    case types.LOAD_PRODUCTS_ERROR:
    case types.LOAD_USERS_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loggedin: false,
        error: action.payload,
      };
    case types.GET_SINGLE_USER_ERROR:
      return {
        ...state,
        loading: false,
        loggedin: true,
        error: action.payload,
      };
    case types.LOAD_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        loggedin: true,
        error: action.payload,
      };
    case types.CREATE_USER_ERROR:
    case types.DELETE_USER_ERROR:
    case types.UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.ADD_CART:
      if (state.numberCart === 0) {
        let cart = {
          id: action.payload.id,
          quantity: 1,
          name: action.payload.name,
          price: action.payload.price,
          size: action.payload.size,
          color: action.payload.color,
        };
        state.Carts.push(cart);
      } else {
        let check = false;
        // eslint-disable-next-line
        state.Carts.map((item, key) => {
          if (item.id === action.payload.id) {
            state.Carts[key].quantity++;
            check = true;
          }
        });
        if (!check) {
          let _cart = {
            id: action.payload.id,
            quantity: 1,
            name: action.payload.name,
            price: action.payload.price,
            size: action.payload.size,
            color: action.payload.color,
          };
          state.Carts.push(_cart);
        }
      }
      localStorage.setItem("numberCart", state.numberCart + 1);
      localStorage.setItem("Cart", JSON.stringify(state.Carts));
      return {
        ...state,
        loading: false,
        numberCart: state.numberCart + 1,
      };

    case types.DELETE_CART:
      let quantity_ = state.Carts[action.payload].quantity;
      localStorage.setItem("numberCart", state.numberCart - quantity_);
      localStorage.setItem(
        "Cart",
        JSON.stringify(
          state.Carts.filter((item) => {
            return item.id !== state.Carts[action.payload].id;
          })
        )
      );
      return {
        ...state,
        loading: false,
        numberCart: state.numberCart - quantity_,
        Carts: state.Carts.filter((item) => {
          return item.id !== state.Carts[action.payload].id;
        }),
      };
    case types.INCREASE_QUANTITY:
      state.numberCart++;
      state.Carts[action.payload].quantity++;
      localStorage.setItem("numberCart", state.numberCart);
      localStorage.setItem("Cart", JSON.stringify(state.Carts));
      return {
        ...state,
      };
    case types.DECREASE_QUANTITY:
      let quantity = state.Carts[action.payload].quantity;
      if (quantity > 1) {
        state.numberCart--;
        state.Carts[action.payload].quantity--;
        localStorage.setItem("numberCart", state.numberCart);
        localStorage.setItem("Cart", JSON.stringify(state.Carts));
      }
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default usersReducer;
