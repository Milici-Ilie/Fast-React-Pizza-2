import LinkButton from "../../ui/LinkButton";

//🧵🧵[BUILDING THE CART PAGE]🧵🧵
function EmptyCart() {
  return (
    <div className="px-4 py-3 ">
      <div className="text-sm text-blue-500 hover:text-blue-700 hover:underline">
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      </div>

      <p className="mt-7 font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
