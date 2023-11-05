import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    {/* 🔧🔧[REDUX USER]🔧🔧 here we imported the <App/> inside of the <Provider/> that auttomatically imported from "react", also we need to call the PROP "store" from the "store.js" file 🔧🔧[REDUX USER]🔧🔧 */}
  </React.StrictMode>,
);
