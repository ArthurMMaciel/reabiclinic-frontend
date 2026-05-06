import React, { useReducer } from "react";

export const AuthenticationContext = React.createContext();

const AuthenticationContextProvider = (props) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "LOGIN":
          return { usuario: action.usuario };
        case "LOGOUT":
          return { usuario: null };
      }
    },
    { usuario: null }
  );

  return (
    <AuthenticationContext.Provider
      value={{ state: state, dispatch: dispatch }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationContextProvider };
