import React, { useReducer } from "react";

export const FiltroContext = React.createContext();

const FiltroContextProvider = (props) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "incrementarFiltro":
          return { ...prevState, filtro: action.value };
        case "incrementarMaisFiltros":
          return { ...prevState, maisFiltros: action.value };
        default:
          return prevState;
      }
    },
    { filtro: "", maisFiltros: "" }
  );

  return (
    <FiltroContext.Provider value={{ state: state, dispatch: dispatch }}>
      {props.children}
    </FiltroContext.Provider>
  );
};

export { FiltroContextProvider };
