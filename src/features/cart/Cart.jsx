/* eslint-disable */
import { useDispatch, useSelector } from "react-redux";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { clearCart, getCart } from "./cartSlice";

function Cart() {
  const username = useSelector((state) => state.user.username); //👤👤[UPDATE THE USER]👤👤 HOOK from Redux ... here we display the "user" name to his shopping cart 👤👤[UPDATE THE USER]👤👤

  const cart = useSelector(getCart); //🧵🧵[BUILDING THE CART PAGE]🧵🧵 here we imported the function "getCart" from the "cartSlice.js" file 🧵🧵[BUILDING THE CART PAGE]🧵🧵
  const dispatch = useDispatch(); //🧵🧵[BUILDING THE CART PAGE]🧵🧵this "dispatch" we need it in the "button" from bellow, the Clear button 🧵🧵[BUILDING THE CART PAGE]🧵🧵

  if (!cart.length) return <EmptyCart />; //🧵🧵[BUILDING THE CART PAGE]🧵🧵  if there is no item/pizza in the cart we want to display only the "<EmptyCart/>", also check if he got imported 🧵🧵[BUILDING THE CART PAGE]🧵🧵

  return (
    <div className="px-4 py-3">
      <div className="text-[15px] text-sm text-blue-500 hover:text-blue-700 hover:underline">
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      </div>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      {/* 👤👤[UPDATE THE USER]👤👤 here we added the name of the user */}

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-8 mb-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
        {/*🧵🧵[BUILDING THE CART PAGE]🧵🧵CLEAR button, here all we need to do is to call the "clearCart" from the "cartSlice.js" wich is exported in the destructured variable that contains all the state, after we also imported the "useDispatch" function from the "Redux"vthis should already be working🧵🧵[BUILDING THE CART PAGE]🧵🧵*/}
      </div>
    </div>
  );
}

export default Cart;
