/*eslint-disable*/
import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

//🌓🌓[UPDATING CART QUANTITIES]🌓🌓 ❗❗❗ IMPORTANT, check the "cartSlice.js"  see how to STOP the "decreaseQuantity" button when reach 0 item, and not going on the negative side🌓🌓[UPDATING CART QUANTITIES]🌓🌓

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>

      <span className="text-sm font-medium">{currentQuantity}</span>
      {/* 🌓🌓[UPDATING CART QUANTITIES]🌓🌓 here we implement the number of our quantity items between the buttons */}

      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}
//🌓🌓[UPDATING CART QUANTITIES]🌓🌓 check "Button.jsx" if you want to see the style that was applied "round 🌓🌓[UPDATING CART QUANTITIES]🌓🌓"
export default UpdateItemQuantity;
