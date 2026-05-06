import axios from "axios";
import { atualizaToken } from "./chamadasApi/usuarioApi";
import { jwtDecode } from "jwt-decode";

function init() {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("app-token");

      if (config.url.toString().endsWith("atualiza_token")) {
        return config; // Skip adding token for refresh token endpoint
      }

      if (token) {
        try {
          const dados_login = jwtDecode(token);
          const expiration = new Date(dados_login.exp * 1000);

          if (expiration > new Date()) {
            console.log("O token é válido");
            config.headers["Authorization"] = `Bearer ${token}`;
            return config;
          } else {
            throw new Error("Token inválido"); // Throw an error for catch block
          }
        } catch (error) {
          console.log("O token é inválido, tentando renovar");

          // Implement logic for maximum retries if desired
          let reloadCount = localStorage.getItem("reloadCount") || 0;
          reloadCount = parseInt(reloadCount) + 1;
          localStorage.setItem("reloadCount", reloadCount);
          console.log(`Tentativa ${reloadCount} de renovar o token`);

          return atualizaToken()
            .then((response) => {
              const { token_acesso, refreshToken } = response.data;
              localStorage.setItem("app-token", token_acesso);
              localStorage.setItem("refresh-token", refreshToken);
              localStorage.setItem("reloadCount", 0);
              config.headers["Authorization"] = `Bearer ${token_acesso}`;
              return config; // Resolve with updated config
            })
            .catch(() => {
              if (reloadCount >= 3) {
                console.log("Removendo token - set_interceptor_axios.js");
                localStorage.removeItem("app-token");
                localStorage.removeItem("refresh-token");
                localStorage.setItem("reloadCount", 0);
                window.location.reload(); // Or handle logout logic
              } else {
                // Consider implementing exponential backoff before reloading
                window.location.reload();
              }
              return Promise.reject(new Error("Falha ao renovar token")); // Reject with informative error
            });
        }
      }

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
}

init();
