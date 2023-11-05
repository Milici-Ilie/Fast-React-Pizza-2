/*eslint-disable*/

import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

//🔳🔳[MAKE PRIORITY]🔳🔳

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  ); //🔳🔳[MAKE PRIORITY]🔳🔳 this <fetch.Form/> will simply submit the Form and re-validate the page
}

export default UpdateOrder;

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null; //🔳🔳[MAKE PRIORITY]🔳🔳 we need this function to make the action of our button, after the User click this button the total price will rerender in total with the priority price, the time will also rerender and the content with "Priority" will auttomatically be displayed 🔳🔳[MAKE PRIORITY]🔳🔳
}
