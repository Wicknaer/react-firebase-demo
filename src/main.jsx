import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

/* Redux */
import { Provider } from "react-redux";
import { store } from "./app/store";

/* Auth durumu dinleyicisi */
import { listenForAuth } from "./features/auth/authSlice";

/* (Varsa Tailwind) */
import "./index.css";

/* Oturumu dinlemeye başla
   - Bu satır Provider'dan ÖNCE de çalışabilir, sonra da.  */
store.dispatch(listenForAuth());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
