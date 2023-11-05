/*eslint-disable*/

import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "inlinde-block rounded-full bg-yellow-400 text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: base + "px-4 py-3 md:px-6 md:py-4",
    small: base + "px-4 py-2 md:px-5 md:py-2.5 text-xs",
    round: base + "px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
    //🌓🌓[UPDATING CART QUANTITIES]🌓🌓🌓🌓[UPDATING CART QUANTITIES]🌓🌓
    secondary:
      "inlinde-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:ring-stone-200 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    ); //🛒🛒[MENU ITEMS TO CART]🛒🛒 like the "if" (to) method from above we want to activate this button with the functionality of "onClick" only when the button will contain the (onClick) PROP, so this button with this functionality will be dispplayed in our case only in the "menu" page 🛒🛒[MENU ITEMS TO CART]🛒🛒

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button> // we need to accept also the "disabled" from the Button from the "CreateOrder.jsx"  file ... go and check the <Button/> from the "CreateOrder.jsx" file
  );
}

export default Button;
