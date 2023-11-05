import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.user.username); //👤👤[UPDATE THE USER]👤👤 This is how we check if the user has logged in when they return to the menu page👤👤[UPDATE THE USER]👤👤 === also check the "Cart.jsx" file and the "CreateOrder.jsx" file to see how we implemented the name also there

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue ordering, {username}
        </Button>
      )}
      {/* 👤👤[UPDATE THE USER]👤👤 here we created a "ternary operator" method that will check if the user was already logged in or not, if he was logged in than the <Button> will be displayed, this will send the "user" to the "menu" page */}
    </div>
  );
}

export default Home;
