import axios from "axios";
const url_base = import.meta.env.VITE_URL_API_BASE;
const url = `${url_base}/usuarios`;

const valorFiltro = (url, filtro) => {
  let urlMontado = url;
  if (filtro) {
    const filtroValue = Array.isArray(filtro.value)
      ? `[${filtro.value}]`
      : filtro.value;
    const filtroOperator =
      filtro.operator === "isAnyOf" ? "in" : filtro.operator;

    console.log("O filtro value é", "&value=" + filtroValue);
    urlMontado = urlMontado + "filtro=1&";
    urlMontado = urlMontado + "field=" + filtro.field + "&";
    urlMontado = urlMontado + "operator=" + filtroOperator + "&";
    urlMontado = urlMontado + "value=" + filtroValue + "&";
    return urlMontado;
  } else {
    return url;
  }
};

export const alterarSenha = (usuario_id, senha) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${url}/alterar_senha/${usuario_id}`, senha)
      .then((resp) => resolve(resp))
      .catch((error) => reject(error));
  });


export const cadastrarUsuario = (values) =>
  new Promise((resolve, reject) => {
    axios
      .post(url, {
        login: values.login,
        email: values.email,
        senha: values.senha,
        nomeCompleto: values.nomeCompleto,
        especialidade: values.especialidade
      })
      .then((resp) => resolve(resp))
      .catch((error) => reject(error));
  });

export const atualizaToken = () => {
  return new Promise((resolve, reject) => {
    const refreshToken = localStorage.getItem("refresh-token");

    axios
      .post(`${url_base}/autenticacao/atualiza_token`, {
        refreshToken,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const autentica = (login, senha) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url_base}/autenticacao/login`, {
        login: login,
        senha,
      })
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200 || resp.status === 201) {
          resolve(resp.data);
        } else {
          console.log(resp);
          reject(resp.data.result);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const logout = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/logout`)
      .then((resp) => {
        if (resp.status === 204) {
          resolve(resp.data);
        } else {
          reject(resp.data.result);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const buscarTodosUsuarios = (
  filtro = "",
  colunaOrdem = "",
  ordem = "",
  limit = null,
  offset = null
) =>
  new Promise((resolve, reject) => {
    let url_montado = `${url}?`;

    if (limit) {
      const computedOffset = offset * limit;

      url_montado = url_montado + "limit=" + limit + "&offset=" + computedOffset + "&";
    }

    if (filtro) {
      url_montado = valorFiltro(url_montado, filtro);
    }

    if (colunaOrdem) {
      url_montado = url_montado + "coluna=" + colunaOrdem + "&";
    }

    if (ordem) {
      url_montado = url_montado + "order=" + ordem;
    }

    axios
      .get(url_montado)
      .then((resp) => {
        if (resp.data) {
          resolve(resp.data);
        } else {
          reject(new Error("Usuário não encontrado."));
        }
      })
      .catch((error) => reject(error));
  });

export const buscaUsuario = (id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${url}/${id}`)
      .then((resp) => {
        if (resp.data) {
          resolve(resp.data);
        } else {
          reject(new Error("Usuário não encontrado."));
        }
      })
      .catch((error) => reject(error));
  });

export const alterarUsuario = (usuario_id, usuario) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${url}/${usuario_id}`, usuario)
      .then((resp) => resolve(resp))
      .catch((error) => reject(error));
  });
