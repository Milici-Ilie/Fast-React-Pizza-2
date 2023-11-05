/*eslint-disable*/

import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

//⛔⛔[DELETING CART ITEMS]⛔⛔

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch(); //always call the "dispatch" HOOK from READUX

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
    //⛔⛔[DELETING CART ITEMS]⛔⛔  here we need to importing also the "pizzaId" from the "cartSlice.js" file, "cartSlice" function and "deleteItem" ==== also need to import this PROP "pizzaId" to our button from "CartItem.jsx" file
  );
}

export default DeleteItem;
