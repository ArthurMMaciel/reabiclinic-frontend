import React, { useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { history } from "../../history";
import { Box } from "@mui/material";
import {
  alterarUsuario,
  buscaUsuario,
  cadastrarUsuario,
} from "../../chamadasApi/usuarioApi";
import CampoTexto from "../../components/CamposTexto/CampoTexto";
import CampoSenha from "../../components/CamposTexto/CampoSenha";
import { validateEmail } from "../../util/validateEmail";

const styles = () => ({
  div: {
    margin: "10px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
});

const CadastroProfissional = (props) => {
  const { classes } = props;
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [edicao, setEdicao] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const campoTextoRef = useRef(null);

  const handleCancelar = () => {
    history.push("/lista-profissional");
  };

  const handleSim = () => {
    let values = {
      login,
      email,
      senha,
      nomeCompleto,
      especialidade,
    };

    if (!validateEmail(email)) {
      toast.warn("O email digitado é inválido.", {
        theme: "colored",
      });
      return;
    }

    //  VALIDAÇÃO CAMPOS
    if (!edicao) {
      if (senha.length < 6) {
        toast.warn("A senha deve ter no mínimo 6 caracteres.", {
          theme: "colored",
        });
        return;
      }
      if (
        !nomeCompleto ||
        !email ||
        !senha ||
        !confirmarSenha ||
        !especialidade ||
        !login
      ) {
        toast.error("Preencha todos os campos para prosseguir", {
          theme: "colored",
        });
        if (campoTextoRef.current) {
          campoTextoRef.current.focus();
        }
        return;
      }

      if (senha !== confirmarSenha) {
        toast.error("Os campos senha devem ser iguais", {
          theme: "colored",
        });
        if (campoTextoRef.current) {
          campoTextoRef.current.focus();
        }
        return;
      }
    } else {
      if (!nomeCompleto || !email || !especialidade) {
        toast.error("Preencha todos os campos para prosseguir", {
          theme: "colored",
        });
        if (campoTextoRef.current) {
          campoTextoRef.current.focus();
        }
        return;
      }
    }

    // REQUISIÇÃO API
    if (!edicao) {
      cadastrarUsuario(values)
        .then(() => {
          toast.success("Profisisonal cadastrado com sucesso", {
            theme: "colored",
          });
          history.push("/lista-profissional");
        })
        .catch((error) => {
          toast.error(error.response.data.message, { theme: "colored" });
        });
    } else {
      let values = {
        email,
        nomeCompleto,
        especialidade,
      };
      alterarUsuario(props.location.state.idUsuario, values)
        .then(() => {
          toast.success("Profisisonal editado com sucesso", {
            theme: "colored",
          });
          history.push("lista-profissional");
        })
        .catch((error) => {
          toast.error(error.response.data.message[0], { theme: "colored" });
        });
    }
  };

  const getUsuario = (id) => {
    setCarregando(true);
    buscaUsuario(id)
      .then((resp) => {
        console.log(resp);
        setEmail(resp.email);
        setEspecialidade(resp.especialidade);
        setNomeCompleto(resp.nomeCompleto);
        setCarregando(false);
      })
      .catch((error) => {
        toast.error("Erro ao buscar informações do Profisisonal");
        setCarregando(false);
      });
  };

  useEffect(() => {
    if (props.location.state && props.location.state.edicao) {
      setEdicao(true);
    } else {
      setEdicao(false);
    }
    if (
      props.location.state &&
      props.location.state.idUsuario &&
      props.location.state.idUsuario > 0
    ) {
      getUsuario(props.location.state.idUsuario);
    }
  }, [props.location.state]);

  return (
    <div
      className="flex flex-row justify-center items-center"
      style={{ height: "90vh" }}
    >
      <Box
        className="p-20 rounded-3xl shadow-lg"
        sx={{
          borderRadius: 3,
          margin: "10px",
          justifyContent: "center",
          width: "50%",
          height: "fit-content",
          bgcolor: "rgba(66, 156, 146, .8)",
        }}
        backgroundColor={"transparent"}
        display="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="flex gap-2">
            {edicao ? (
              <></>
            ) : (
              <CampoTexto
                style={{ width: "97%", margin: "12px" }}
                name="login"
                id="login"
                label="Login"
                value={login}
                variant="outlined"
                tipo="text"
                focusnext="nome"
                required={true}
                onChange={(e) => setLogin(e.target.value)}
                autoFocus
                ref={campoTextoRef}
                cadastro
              />
            )}

            <CampoTexto
              style={{ width: "97%", margin: "12px" }}
              name="nome"
              id="nome"
              label="Nome"
              value={nomeCompleto}
              variant="outlined"
              tipo="text"
              focusnext="especialidade"
              required={true}
              onChange={(e) => setNomeCompleto(e.target.value)}
              ref={campoTextoRef}
              cadastro
            />
          </div>

          <div className="flex gap-2">
            <CampoTexto
              style={{ width: "97%", margin: "12px" }}
              name="especialidade"
              id="especialidade"
              label="Especialidade"
              value={especialidade}
              variant="outlined"
              tipo="text"
              focusnext="email"
              required={true}
              onChange={(e) => setEspecialidade(e.target.value)}
              ref={campoTextoRef}
              cadastro
            />

            <CampoTexto
              style={{ width: "97%", margin: "12px" }}
              name="email"
              id="email"
              label="Email"
              value={email}
              variant="outlined"
              tipo="text"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
              ref={campoTextoRef}
              cadastro
            />
          </div>

          {edicao ? (
            <></>
          ) : (
            <div className="flex gap-2">
              <CampoSenha
                style={{ width: "97%", margin: "12px" }}
                label="Senha"
                required
                defaultValue={senha}
                onChange={(e) => setSenha(e.target.value)}
                ref={campoTextoRef}
                cadastro
              />

              <CampoSenha
                style={{ width: "97%", margin: "12px" }}
                label="Confirma Senha"
                required
                defaultValue={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                ref={campoTextoRef}
                cadastro
              />
            </div>
          )}
        </div>
        <div
          style={{
            marginTop: "12px",
            justifyContent: "end",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            onClick={handleSim}
            autoFocus
            type="submit"
            style={{
              color: "white",
              background: "green",
              fontFamily: `"Raleway", sans-serif`,
              fontWeight: "bold",
              borderRadius: "7px",
            }}
          >
            {edicao ? "Editar" : "Cadastrar"}
          </Button>
          <Button
            onClick={handleCancelar}
            style={{
              color: "white",
              background: "red",
              fontFamily: `"Raleway", sans-serif`,
              fontWeight: "bold",
              borderRadius: "7px",
              marginLeft: "8px",
            }}
          >
            Cancelar
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default CadastroProfissional;
