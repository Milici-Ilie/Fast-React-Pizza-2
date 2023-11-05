import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],

  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: "Mediterranean",
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ], //🛒🛒[CREATING THE CART]🛒🛒 so here we create the variable that will store all the info's/items about the "cart" 🛒🛒[CREATING THE CART]🛒🛒
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = newItem
      state.cart.push(action.payload); //🛒🛒[CREATING THE CART]🛒🛒 this will mutate the "Array" and will add a new object
    },
    deleteItem(state, action) {
      //payload=pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload); //🛒🛒[CREATING THE CART]🛒🛒 every time when the "pizzaId" will be the same with the "payload" than this pizza will be deleted// ==== ⛔⛔[DELETING CART ITEMS]⛔⛔
    },
    increaseItemQuantity(state, action) {
      //payload = pizzaId

      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice; //🛒🛒[CREATING THE CART]🛒🛒 here we increase the quantity of a pizza, but also we must increase the price
    },
    decreaseItemQuantity(state, action) {
      //payload = pizzaId

      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice; //decreasing the state

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action); //🌓🌓[UPDATING CART QUANTITIES]🌓🌓 here we implemented a logic that will delete the item from our Cart if the user is decreasing until 0, "cartSlice" is the variable from this file with the props (state, action) === === "caseReducers is part of the internal structure of a slice defined with Redux Toolkit, providing a convenient way to call the reducers within that slice without the need to create additional files or additional code to do so🌓🌓[UPDATING CART QUANTITIES]🌓🌓
    },
    clearCart(state) {
      state.cart = []; //reset/clear the cart
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions; //🛒🛒[CREATING THE CART]🛒🛒

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart; //🧵🧵[BUILDING THE CART PAGE]🧵🧵 taking the info's from the menu when the use is selecting one item/pizza 🧵🧵[BUILDING THE CART PAGE]🧵🧵 ... 📜📃[CREATING NEW ORDER]📃📜

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0); //🛒🛒[MENU ITEMS TO CART]🛒🛒 including this function here we make it "reusable" and we can use it where we need it ... 🎈🎈🎈 the reason that there are called 2 "cart's" is because our state property is called "cart" and we have the state also called "cart", check this on the "cartSlice.js" file in the "initialState" variable ======= the "reduce" method in our situation will calculate the number of pizza's 🛒🛒[MENU ITEMS TO CART]🛒🛒 check down in the "return" to see where we implemented the "totalCartQuantity" variable ... also check the "CartOverview.jsx" file

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0); //🛒🛒[MENU ITEMS TO CART]🛒🛒 reusable function for "price"

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0; //⛔⛔[DELETING CART ITEMS]⛔⛔ to see a full explanation about this code check in the AI for documentation if need it ==== this is connected with the "MenuItem.jsx" file

//❗❗❗❗❗ by the way in larger applications those functions may cause serious problem, so we need to use the "reSelect" Redux library and optimize these selectors === here is where you can check out and read more about it if need it //reselect ❗❗❗❗❗
