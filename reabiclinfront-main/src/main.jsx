import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "./set_interceptor_axios";
import { atualizaToken } from "./chamadasApi/usuarioApi";
import App from "./App";
import { jwtDecode } from "jwt-decode";
import store from "./store";
import { persistStore } from "redux-persist";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

setInterval(() => {
  const token = localStorage.getItem("app-token");
  let renovando = localStorage.getItem("renovando")
    ? localStorage.getItem("renovando")
    : false;

  if (!token) return;
  console.log(renovando);

  try {
    const dados_login = jwtDecode(token);
    const data = new Date();
    if (new Date(dados_login.exp * 1000 - 120000) < data && !renovando) {
      console.log("renovando");

      localStorage.setItem("renovando", true);
      atualizaToken()
        .then((response) => {
          let token_novo = response.data.token_acesso;
          let refreshToken_novo = response.data.refreshToken;
          localStorage.setItem("app-token", token_novo);
          localStorage.setItem("refresh-token", refreshToken_novo);
          localStorage.setItem("renovando", false);
        })
        .catch((error) => {
          console.log("Removendo token - função em index.js");
          localStorage.removeItem("app-token");
          localStorage.removeItem("refresh-token");
          localStorage.setItem("renovando", false);
          console.log(error);
        });
    }
  } catch (error) {
    localStorage.removeItem("app-token");
    localStorage.removeItem("refresh-token");
    localStorage.setItem("reloadCount", 0);
    window.location.reload();
    return;
  }
}, 300000);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter forceRefresh={true}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
