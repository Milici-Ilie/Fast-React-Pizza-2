import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch(); //👤👤[UPDATE THE USER]👤👤 HOOK imported from "react-redux"
  const navigate = useNavigate(); //👤👤[UPDATE THE USER]👤👤 also a HOOK, now we want to redirect the user also to the menu, this will connect the "user" page/ first page with the "menu" page after the user typed his name 👤👤[UPDATE THE USER]👤👤

  function handleSubmit(e) {
    e.preventDefault();

    if (!username) return; //👤👤[UPDATE THE USER]👤👤 if the is no username return
    dispatch(updateName(username)); //👤👤[UPDATE THE USER]👤👤 "updateName" is from the "userSlice.js" file and will change the "username" wich is also from the "userSlice.js" at this line of code "state.username = action.payload" 👤👤[UPDATE THE USER]👤👤
    navigate("/menu"); //👤👤[UPDATE THE USER]👤👤 here we are redirecting the info's from the "navigate" variable from above to the "menu" content
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-72 input mb-8"
      />

      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
