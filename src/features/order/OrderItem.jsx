/* eslint-disable */
import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;
  // 🩰🩰[FETCHING DATA]🩰🩰 we need to accept the "ingredients" and the "isLoadingIngredients" in the PROP of our function

  return (
    <li className="space-y-1 py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>

      <p className="text-sm capitalize italic text-stone-500">
        {isLoadingIngredients ? "Loading..." : ingredients.join(", ")}
      </p>
      {/* 🩰🩰[FETCHING DATA]🩰🩰 here we include the elements in our list item */}
    </li>
  );
}

export default OrderItem;
