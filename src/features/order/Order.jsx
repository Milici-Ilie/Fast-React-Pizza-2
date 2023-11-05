// Test ID: IIDSAT
/* eslint-disable */
import { useFetcher, useLoaderData } from "react-router-dom";

import OrderItem from "./OrderItem";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

import { getOrder } from "../../services/apiRestaurant";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData(); //🔍🔍[SEARCH BAR]🔍🔍 another HOOK, this is now the new order 🔍🔍[SEARCH BAR]🔍🔍

  const fetcher = useFetcher(); // 🩰🩰[FETCHING DATA]🩰🩰 check if the "useFetcher" got imported === we will use this to display the childs of the parrent element, in our case the ingredients of the pizzas when the user reaches the "Order" page 🩰🩰[FETCHING DATA]🩰🩰

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  ); //🩰🩰[FETCHING DATA]🩰🩰

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order {id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="dive-stone-200 divide-y border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            } //🩰🩰[FETCHING DATA]🩰🩰 also need to include the "ingredients" and the "isLoadingIngredients" here 🩰🩰[FETCHING DATA]🩰🩰
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateOrder order={order} />}
      {/* 🔳🔳[MAKE PRIORITY]🔳🔳 this Priority Button will be displayed after the User command his order, and only if the order is not already checked as Priority 🔳🔳[MAKE PRIORITY]🔳🔳 */}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId); //🔍🔍[SEARCH BAR]🔍🔍 the "params" we take it automatically from the API and the "orderId" is the name that we give in our "param" in the "App,jsx" file "path: "/order/:orderId"," 🔍🔍[SEARCH BAR]🔍🔍
  return order;
}

export default Order;
