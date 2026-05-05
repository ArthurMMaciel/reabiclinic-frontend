import React from "react";
import { Router, Switch } from "react-router";
import { history } from "../history";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";
import AllowLogin from "./AllowLogin";

// IMPORT DO LOGIN
import Login from "../pages/login/Login";

// IMPORT DA HOME
import Home from "../pages/home/Home";
import Profissional from "../pages/profissional/Profissional";
import Horarios from "../pages/horarios/Horarios";
import CadastroProfissional from "../pages/profissional/CadastroProfissional";

// IMPORT DOS CADASTROS
// import CadastroCargoDashboard from "../pages/cadastro-cargo-dashboard/CadastroCargoDashboard";

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        {/* ROTA LOGIN */}
        <AllowLogin component={Login} exact path="/login" />

        {/* ROTA HOME */}
        <PrivateRoute component={Home} exact path="/" />

        <PrivateRoute component={Horarios} exact path="/turnos" />

        <PrivateRoute
          component={Profissional}
          exact
          path="/lista-profissional"
        />

        <PrivateRoute
          component={CadastroProfissional}
          exact
          path="/cadastro-profissional"
        />

        {/* ROTAS DE CADASTRO */}
        {/* <PrivateRoute
          component={CadastroCargoDashboard}
          exact
          path="/cadastro-cargo"
        /> */}
        <PrivateRoute component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
