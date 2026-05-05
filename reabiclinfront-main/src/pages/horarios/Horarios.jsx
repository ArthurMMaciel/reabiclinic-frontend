import { Box } from "@mui/material";
import React from "react";
import DataHora from "../../components/DataHora/DataHora";

const Horarios = () => {
  return (
    <div
      className="flex flex-col justify-center items-center w-full h-full" // Ajustado para ocupar toda a altura disponível na tela
      style={{ overflow: "hidden" }} // Impede o scroll da página
    >
      <Box
        className="p-8 rounded-3xl shadow-lg"
        sx={{
          borderRadius: 3,
          margin: "10px",
          width: "90%",
          maxHeight: "85vh", // Limita a altura máxima do Card
          bgcolor: "rgba(66, 156, 146, .8)", // Cor do fundo
        }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        style={{
          overflowY: "auto", // Scroll apenas dentro do card
          height: "auto", // Card cresce conforme o conteúdo
        }}
      >
        <p className="text-primary-800 font-bold text-center">
          Nesta tela você pode selecionar os dias da semana e horários em que
          estará disponível para realizar atendimentos.
        </p>
        <div style={{ height: "12px" }}></div>
        <DataHora />
      </Box>
    </div>
  );
};

export default Horarios;
