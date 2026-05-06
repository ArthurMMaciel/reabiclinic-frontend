import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { autentica } from "../../chamadasApi/usuarioApi";
import { toast } from "react-toastify";
import { history } from "../../history";
import logo from "../../img/logo.png";
import fundo from "../../img/fundo.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (event) => {
    setLogin(event.target.value);
  };

  const handleSenha = (event) => {
    setSenha(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!login || !senha) {
      toast.warn("Digite o login e a senha para entrar", { theme: "colored" });
      return;
    }
    setBtnDisabled(true);
    autentica(login, senha)
      .then((data) => {
        console.log("Os dados do login são: ", data);
        const { token_acesso, refreshToken } = data;
        localStorage.setItem("app-token", token_acesso);
        localStorage.setItem("refresh-token", refreshToken);
        history.push("/");
        // window.location.reload();
      })
      .catch((error) => {
        localStorage.removeItem("app-token");
        localStorage.removeItem("refresh-token");
        if (error && error.data) {
          console.log(error);
          console.log(error.data);
          toast.error(
            `${error.data && error.data.message ? error.data.message : "Login indisponível no momento"}`,
            {
              theme: "colored",
            }
          );
        } else {
          toast.error(`${error}`, {
            theme: "colored",
          });
        }
        setTimeout(() => {
          setBtnDisabled(false);
        }, 3000);
      });
  };

  return (
    <Box
      className="min-h-screen bg-cover bg-center items-center justify-center flex flex-row select-none"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Transparência preta
          zIndex: 1,
        }}
      ></Box>
      <Box
        className="p-20 rounded-3xl shadow-lg"
        sx={{
          width: "100%",
          maxWidth: 400,
          zIndex: 2,
          bgcolor: "rgba(66, 156, 146, .8)",
        }}
      >
        <img alt="Reabi Logo" src={logo} className="h-20 w-auto" />
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "&:hover fieldset": {
                    boxShadow: "0 4px 4px rgba(0, 0, 0, .5)",
                    borderColor: "rgba(66, 156, 146, 1)",
                  },
                  "&.Mui-focused fieldset": {
                    boxShadow: "0 4px 4px rgba(0, 0, 0, .5)",
                    borderColor: "rgba(66, 156, 146, 1)",
                  },
                  borderRadius: "10px",
                },
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 100px rgba(90, 149, 140, 1) inset", // Cor de fundo do autofill
                  WebkitTextFillColor: "white", // Cor do texto no autofill
                },
                backgroundColor: "rgba(90, 149, 140, 1)",
                borderRadius: "10px",
              }}
              label="Login"
              type="text"
              fullWidth
              // required
              variant="outlined"
              margin="normal"
              onChange={handleLogin}
              slotProps={{
                inputLabel: {
                  sx: {
                    color: "white", // Cor padrão do label
                    "&.Mui-focused": {
                      color: "white", // Cor do label quando o campo está em foco
                    },
                  },
                },
              }}
            />
          </div>
          <div className="mb-4">
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "&:hover fieldset": {
                    boxShadow: "0 4px 4px rgba(0, 0, 0, .5)",
                    borderColor: "rgba(66, 156, 146, 1)",
                  },
                  "&.Mui-focused fieldset": {
                    boxShadow: "0 4px 4px rgba(0, 0, 0, .5)",
                    borderColor: "rgba(66, 156, 146, 1)",
                  },
                  borderRadius: "10px",
                },
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 100px rgba(90, 149, 140, 1) inset", // Cor de fundo do autofill
                  WebkitTextFillColor: "white", // Cor do texto no autofill
                },
                backgroundColor: "rgba(90, 149, 140, 1)",
                borderRadius: "10px",
              }}
              label="Senha"
              type={showPassword ? "text" : "password"}
              fullWidth
              // required
              variant="outlined"
              margin="normal"
              onChange={handleSenha}
              slotProps={{
                inputLabel: {
                  sx: {
                    color: "white", // Cor padrão do label
                    "&.Mui-focused": {
                      color: "white", // Cor do label quando o campo está em foco
                    },
                  },
                },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
          {/* O botão agora chama a função handleSubmit ao ser clicado */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mb-4 hover:bg-blue-600 transition-all duration-200"
            disabled={btnDisabled}
          >
            Entrar
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
