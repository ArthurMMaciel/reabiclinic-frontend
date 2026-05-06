import React from "react";
import { jwtDecode } from "jwt-decode";
import { Route, Redirect } from "react-router"; // Importa da biblioteca correta

const PrivateRoute = (props) => {
  const token = localStorage.getItem("app-token");
  const isLogged = !!token;
  const payload = isLogged ? jwtDecode(token) : null;
  if (!payload) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

export default PrivateRoute;
