import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer, //🛒🛒[CREATING THE CART]🛒🛒
  },
}); // 🔧🔧[REDUX USER]🔧🔧 this is the REDUX store, also go and check the "main.jsx" file

export default store;
