import React, { useReducer } from "react";

export const FiltroDataContext = React.createContext();

const FiltroDataContextProvider = (props) => {
  function primeiroDiaDoMes() {
    let data = new Date();
    data.setDate(1);
    return data;
  }

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      if (action.type === "atualizarFiltroDataInicial") {
        return { ...prevState, dataInicial: action.value.dataInicial };
      } else if (action.type === "atualizarFiltroDataFinal") {
        return { ...prevState, dataFinal: action.value.dataFinal };
      }
    },
    { dataInicial: primeiroDiaDoMes(), dataFinal: new Date() }
  );

  return (
    <FiltroDataContext.Provider value={{ state: state, dispatch: dispatch }}>
      {props.children}
    </FiltroDataContext.Provider>
  );
};

export { FiltroDataContextProvider };
