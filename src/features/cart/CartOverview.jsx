import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity); //🛒🛒[MENU ITEMS TO CART]🛒🛒 here we imported the "getTotalCartPrice" function from the "cartSlice.js"
  const totalCartPrice = useSelector(getTotalCartPrice); //🛒🛒[MENU ITEMS TO CART]🛒🛒 also imported from the "cartSlice.js" file

  if (!totalCartQuantity) return null; //🛒🛒[MENU ITEMS TO CART]🛒🛒 here sett to not be visible the "cart" if there is no item selected in him 🛒🛒[MENU ITEMS TO CART]🛒🛒

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4   text-stone-200 uppercase text-sm sm:px-6 md:text-base">
      <p className="text-stone-350 font font-semibold space-x-4 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
        {/* to check the "formatCurrency" that is nicely formating our prices go and check the "helpers.js" file */}
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
