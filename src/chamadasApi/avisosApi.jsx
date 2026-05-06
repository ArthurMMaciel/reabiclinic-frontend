import axios from "axios";
import { MOCK_AUTH_ENABLED, mockBuscarAvisos } from "../mockData/mockAuth";

const url_base = import.meta.env.VITE_URL_API_BASE;
const url = `${url_base}/avisos`;

export const buscarAvisos = () => {
  if (MOCK_AUTH_ENABLED) {
    return mockBuscarAvisos();
  }

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((resp) => {
        if (resp.data) {
          resolve(resp.data);
        } else {
          reject(new Error("Nenhum aviso encontrado."));
        }
      })
      .catch((error) => reject(error));
  });
};
