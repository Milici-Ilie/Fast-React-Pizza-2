/* eslint-disable */

import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import DeleteItem from "../cart/DeleteItem";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch(); //🛒🛒[MENU ITEMS TO CART]🛒🛒 we also need the "useDispatch()" HOOK from REDUX for this to work 🛒🛒[MENU ITEMS TO CART]🛒🛒

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  // ⛔⛔[DELETING CART ITEMS]⛔⛔
  const currentQuantity = useSelector(getCurrentQuantityById(id)); // this variable is used to display the Button from the Menu when an item is greater than > 0 depending on the item "id" from the destrucured variable from bellow ofc. === also go and check the "cartSlice.js" file to see the export of "getCurrentQuantityById"
  const isInCart = currentQuantity > 0; // this variable is created to see if an item is in the Cart === check the functionallity of this variable down 👇, before the <Button/>
  // ⛔⛔[DELETING CART ITEMS]⛔⛔

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem)); // this action creator will be create by calling the item action creator from "cartSlice.js" file, down in the "export" you will the variable that contains destructured values, we are interested on the "addItem" from there wich is created in the variable "cartSlice" in the same file "cartSlice.js"
  } //🛒🛒[MENU ITEMS TO CART]🛒🛒 this function will sent the selected items from the "menu" to the "cart" ...=== in the "newItem" variable we set the values to the displayed contents 🛒🛒[MENU ITEMS TO CART]🛒🛒

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col flex-grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex   items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              {/* 🌓🌓[UPDATING CART QUANTITIES]🌓🌓 here we add the quantity pizza and the "- and +" buttons also in the Menu, those will be visible after the user is pressing the "Add to cart" button 🌓🌓[UPDATING CART QUANTITIES]🌓🌓 */}
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {/* ⛔⛔[DELETING CART ITEMS]⛔⛔ we created this button here to delete items from the menu, the logic to implement this is to see if the quantity of an item/pizza in the "Cart" is greater than > 0 than display the "Delete" button, otherwise display the "ADD TO CART" button, for this to work check the variable from above in thise file 👆 "currentQuantity" ⛔⛔[DELETING CART ITEMS]⛔⛔ ========= so now after we added the variable "isInCart" the button will be displayed only when the quantity item from the Cart Array will be greater than > 0 ======= also check exaclty bellow that we added "!isInCart" to display the button "Add To Cart" only if the "!soldOut" is not true and also if "!isInCart" is not true 🔻🔻 */}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
            // 🛒🛒[MENU ITEMS TO CART]🛒🛒 to make the button work and send the items to the cart we need to create an event handler, "onClick" that wil take care, check the function from above... === here we also need to go at the <Button/> file and implement the "onClick" PROP to make effect when the button is pressed, check the "Button.jsx" file 👆 🛒🛒[MENU ITEMS TO CART]🛒🛒
          )}
          {/* 🛒🛒[MENU ITEMS TO CART]🛒🛒 here we display the button "Add to cart" only if the item is not containign the "soldOut" function 🛒🛒[MENU ITEMS TO CART]🛒🛒 */}
        </div>
        {/* naming the Button with the "type"='small' we can now change the type of the other reusable Button in our code and give them another name, for exemple "type"='primary' ==== ❗❗❗ note that this "type" is just a PROP that we added and we must includ in the "Button.jsx" also to make it work, check the "Button.jsx" file */}
      </div>
    </li>
  );
}

export default MenuItem;
