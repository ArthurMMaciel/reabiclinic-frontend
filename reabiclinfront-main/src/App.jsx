import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { FiltroContextProvider } from "./context/FiltroContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./rotas/Routes";

const App = () => {
  const token =
    localStorage.getItem("app-token") != null
      ? localStorage.getItem("app-token")
      : null;

  return (
    <div className="app">
      {token !== null ? (
        <>
          <main className="content">
            <FiltroContextProvider>
              <NavBar />
              <ToastContainer />
              <Routes />
            </FiltroContextProvider>
          </main>
        </>
      ) : (
        <>
          <main className="content">
            <FiltroContextProvider>
              <ToastContainer />
              <Routes />
            </FiltroContextProvider>
          </main>
        </>
      )}
    </div>
  );
};

export default App;
