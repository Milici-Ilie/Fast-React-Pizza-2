import { useSelector } from "react-redux";

function Username() {
  const username = useSelector((state) => state.user.username);

  if (!username) return null; // if there is no "user" we want to return null/nothing

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
} //🔧🔧[REDUX USER]🔧🔧

export default Username;
