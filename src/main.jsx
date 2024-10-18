import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./core/store/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import GlobalSpinner from "./componets/GlobalSpinner.jsx";
GlobalSpinner;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <GlobalSpinner />
      <App />
    </Provider>
  </StrictMode>
);
