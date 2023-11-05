/* eslint-disable */

import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
//📜📃[CREATING NEW ORDER]📃📜
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../store"; //📜📃[CREATING NEW ORDER]📃📜 clearing the cart after placing and Order
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );
const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  // 📜📃[CREATING NEW ORDER]📃📜 we need this "useState" to create our function for "priority", 20% from the total bill

  const {
    username,
    status: adressStatus,
    position,
    address,
    error: errorAddress, //{/* 🧭🧭[GEOLOCATION]🧭🧭 */} denieing geolocation
  } = useSelector((state) => state.user); //👤👤[UPDATE THE USER]👤👤 including the user name in the Input field ...  check bellow the implementation 👇 ❗❗❗❗❗ ====== {/* 🧭🧭[GEOLOCATION]🧭🧭 */}
  const isLoadingAdress = adressStatus === "loading"; //{/* 🧭🧭[GEOLOCATION]🧭🧭 */}

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();

  const dispatch = useDispatch(); //🧭🧭[GEOLOCATION]🧭🧭🧭🧭[GEOLOCATION]🧭🧭

  const cart = useSelector(getCart);

  // 📜📃[CREATING NEW ORDER]📃📜
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  //those variables will display the current price of pizzas and the total with "priority" price if the user check it//

  if (!cart.length) return <EmptyCart />; //📜📃[CREATING NEW ORDER]📃📜 we will return the <EmptyCart/> if there are no values in the Cart, also need to import <EmptyCart/> 📜📃[CREATING NEW ORDER]📃📜

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username} //👤👤[UPDATE THE USER]👤👤 this is a verry important PROP because is allowing us not only to enter the user name in the input and not having control over it, but the user will be able to change this name or completing it thanks to the "defaultValue ... "👤👤[UPDATE THE USER]👤👤
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && (
            <p className="mt-2 text-xs bg-red-100 text-red-700 rounded-md p-2">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAdress}
              defaultValue={address}
              required
            />
            {/* 🧭🧭[GEOLOCATION]🧭🧭 🔽🔽🔽 */}
            {adressStatus === "error" && (
              <p className="mt-2 text-xs bg-red-100 text-red-700 rounded-md p-2">
                {errorAddress}
              </p>
            )}
          </div>

          {/* 🧭🧭[GEOLOCATION]🧭🧭 */}
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 sm:right-[5px] md:top-[5px]">
              <Button
                disabled={isLoadingAdress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
          {/* 🧭🧭[GEOLOCATION]🧭🧭 🔼🔼🔼 */}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)} //📜📃[CREATING NEW ORDER]📃📜 to make the Priority price work we need to includ also the "value" and "onChange" from here 📜📃[CREATING NEW ORDER]📃📜
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          {/* 🧭🧭[GEOLOCATION]🧭🧭 this will sent the infos to the company about the location of the user, this will check if the user allowed the GeoLocation or completed himself the field */}

          <Button disabled={isSubmitting || isLoadingAdress} type="primary">
            {isSubmitting
              ? "Placing order ..."
              : `Order now for ${formatCurrency(totalPrice)}`}
            {/* 📜📃[CREATING NEW ORDER]📃📜 here we added the price and the total with the priority in the Button "Order now" placed in the Order section of ou App////// note that the Priority should be 20% from the total bill 📜📃[CREATING NEW ORDER]📃📜 */}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you";

  if (Object.keys(errors).length > 0) return errors;

  //If everything is okay, create new order and redirect
  const newOrder = await createOrder(order);

  //Do NOT overuse
  store.dispatch(clearCart()); //📜📃[CREATING NEW ORDER]📃📜 kind of a hack ... we use this to clear our cart after the Order was sent

  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
