import React, { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import { history } from "../../history";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { jwtDecode } from "jwt-decode";
import { Box, Divider, IconButton, styled } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import logo from "../../img/logo.png";
import { alterarUsuario } from "../../chamadasApi/usuarioApi";
import DialogAlertSenha from "../dialogs/DialogAlertSenha";

const currentURL = window.location.href;

const homePageRegex =
  /^(https?:\/\/[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})?(:\d+)?\/?)$/;

const Circle = styled("div")(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: "#5A958C",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
  cursor: "pointer",
  fontFamily: "Raleway",
}));

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sair = () => {
  localStorage.removeItem("app-token");
  localStorage.removeItem("refresh-token");
  sessionStorage.clear();
  // window.location.reload();
  history.push("/");
};

export default function NavBar() {
  const token = localStorage.getItem("app-token");
  const payload = jwtDecode(token) ?? null;
  const initial = payload.login ? payload.login.charAt(0).toUpperCase() : "?";
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [mostraDialogSenha, setMostraDialogSenha] = useState(false);
  const navigation = [
    {
      name: "Início",
      href: "/",
      current: homePageRegex.test(currentURL) ? true : false,
      mostra: true,
    },
    {
      name: "Turnos",
      href: "turnos",
      current: currentURL.includes("turnos") ? true : false,
      mostra: true,
    },
    // {
    //   name: "Agenda",
    //   href: "agenda",
    //   current: currentURL.includes("agenda") ? true : false,
    // },
    // {
    //   name: "Pacientes",
    //   href: "pacientes",
    //   current: currentURL.includes("pacientes") ? true : false,
    // },
    {
      name: "Profissionais",
      href: "lista-profissional",
      current:
        currentURL.includes("lista-profissional") ||
          currentURL.includes("cadastro-profissional")
          ? true
          : false,
      mostra: payload.admin,
    },
  ];

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const alterarSenha = () => {
    setMostraDialogSenha(true);
  };

  const fechaDialog = () => {
    setMostraDialogSenha(false);
  };

  return (
    <Disclosure as="nav" className="bg-primary-200 dark:bg-secondary-200">
      <DialogAlertSenha
        mostrar={mostraDialogSenha}
        titulo="Alterando senha..."
        textoSim="Alterar"
        textoNao="Cancelar"
        callbackNao={() => fechaDialog()}
      />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white-100  hover:bg-secondary-200 hover:text-white-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white-100">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img alt="Your Company" src={logo} className="h-8 w-auto" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-secondary-100 text-white-100"
                        : "text-white-100 hover:bg-secondary-100 hover:text-white-100",
                      "rounded-md px-3 py-2 text-sm text-white-100 font-raleway-medium"
                    )}
                    style={{ display: item.mostra ? "block" : "none" }}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* ========================== DEPOIS QUE O A PARTE DAS NOTIFICAÇÕES ESTIVER PRONTA DESCOMENTAR ESSA PARTE DO CODIGO ======================== */}
            {/* <button
              type="button"
              className="relative rounded-full p-1 text-white-100 hover:bg-secondary-200 dark:hover:bg-secondary-100"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button> */}
            {/* ======================================================================================================================================== */}

            {/* Profile dropdown */}

            {/* ========================== DEPOIS QUE O DARK MODE ESTIVER PRONTO DESCOMENTAR ESSA PARTE DO CODIGO ====================================== */}
            {/* <button
              type="button"
              className="relative rounded-full text-white-100 hover:bg-secondary-200 dark:hover:bg-secondary-100"
            >
              <ToggleTheme />
            </button> */}
            {/* ======================================================================================================================================== */}
            <Box display="flex">
              <IconButton id="menu-appbar" onClick={handleMenu}>
                <Circle>{initial}</Circle>
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <div className="ml-2">
                  <h1 className="font-raleway-semi-bold select-none">
                    {payload.nomeCompleto ? payload.nomeCompleto : "-"}
                  </h1>
                  <p className="font-raleway select-none">
                    {payload.admin
                      ? "ADMIN"
                      : payload.especialidade
                        ? payload.especialidade
                        : "-"}
                  </p>
                </div>
                <Divider />
                <MenuItem onClick={alterarSenha}>
                  <a className="font-raleway">Alterar Senha</a>
                </MenuItem>
                <MenuItem onClick={sair}>
                  <a className="font-raleway">Sair</a>
                </MenuItem>
              </Menu>
            </Box>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-primary-100 text-white-100"
                  : "text-white-100 hover:bg-secondary-200 hover:text-white-100",
                "block rounded-md px-3 py-2 text-base font-raleway-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
