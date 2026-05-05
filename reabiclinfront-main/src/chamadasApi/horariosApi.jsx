import axios from "axios";
const url_base = import.meta.env.VITE_URL_API_BASE;
const url = `${url_base}/turnos`;
import { jwtDecode } from "jwt-decode";

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

export const cadastrarHorario = (values) =>
  new Promise((resolve, reject) => {
    axios
      .post(url, values)
      .then((resp) => resolve(resp))
      .catch((error) => reject(error));
  });

export const buscarTodosHorarios = (
  filtro = "",
  colunaOrdem = "",
  ordem = "",
  limit = null,
  offset = null
) =>
  new Promise((resolve, reject) => {
    let url_montado = `${url}?`;

    if (limit) {
      offset = offset * limit;

      url_montado = url_montado + "limit=" + limit + "&offset=" + offset + "&";
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

    // `${url_montado}id_profissional=1`
    axios
      .get(`${url_montado}`)
      .then((resp) => {
        if (resp.data) {
          resolve(resp.data);
        } else {
          reject("Usuário não encontrado.");
        }
      })
      .catch((error) => reject(error));
  });

export const buscaHorario = (id) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${url}/${id}`)
      .then((resp) => {
        if (resp.data) {
          resolve(resp.data);
        } else {
          reject("Usuário não encontrado.");
        }
      })
      .catch((error) => reject(error));
  });

export const removerHorario = (id) =>
  new Promise((resolve, reject) => {
    axios
      .delete(`${url}/${id}`)
      .then((resp) => {
        if (resp.data) {
          resolve(resp.data);
        } else {
          reject("Turno não encontrado.");
        }
      })
      .catch((error) => reject(error));
  });

export const fecharDiaSemana = (dia) =>
  new Promise((resolve, reject) => {
    axios
      .delete(`${url}/dia_semana/${dia}`)
      .then((resp) => {
        if (resp.data) {
          resolve(resp.data);
        } else {
          reject("Erro ao remover os turno do dia");
        }
      })
      .catch((error) => reject(error));
  });

// export const alterarHorario = (horario_id, horario) =>
//   new Promise((resolve, reject) => {
//     axios
//       .put(`${url}/${horario_id}`, horario)
//       .then((resp) => resolve(resp))
//       .catch((error) => reject(error));
//   });
