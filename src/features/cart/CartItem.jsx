/*eslint-disable*/

import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem"; //⛔⛔[DELETING CART ITEMS]⛔⛔
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId)); // 🌓🌓[UPDATING CART QUANTITIES]🌓🌓 this is created to display the number of items/pizza between the 2 buttons "- and +", also we need to pass this to the "UpdateItemQuantity.jsx" file, so check bellow 👇 🌓🌓[UPDATING CART QUANTITIES]🌓🌓

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        {/* 🌓🌓[UPDATING CART QUANTITIES]🌓🌓 here we imported the file that contains our Button "- and +" ==== also go and check the "Button.jsx" file to see the style that was applied on buttons 🌓🌓[UPDATING CART QUANTITIES]🌓🌓 */}

        <DeleteItem pizzaId={pizzaId} />
        {/* ⛔⛔[DELETING CART ITEMS]⛔⛔ importing the button from the "DeleteItem" file,=== also need to import the "pizzaId" PROP */}
      </div>
    </li>
  );
}

export default CartItem;
