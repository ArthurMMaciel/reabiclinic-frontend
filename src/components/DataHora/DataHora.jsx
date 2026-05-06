import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  buscarTodosHorarios,
  cadastrarHorario,
  fecharDiaSemana,
  removerHorario,
} from "../../chamadasApi/horariosApi";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Button, CircularProgress, IconButton } from "@mui/material";
import DialogHorario from "../DialogHorario/DialogHorario";

export default function DataHora() {
  const [carregando, setCarregando] = useState(false);
  const [openCadastro, setOpenCadastro] = useState(false);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [dias, setDias] = useState([
    { dia: "Segunda-Feira", fechado: false, horarios: [] },
    { dia: "Terça-Feira", fechado: false, horarios: [] },
    { dia: "Quarta-Feira", fechado: false, horarios: [] },
    { dia: "Quinta-Feira", fechado: false, horarios: [] },
    { dia: "Sexta-Feira", fechado: false, horarios: [] },
    { dia: "Sábado", fechado: false, horarios: [] },
    { dia: "Domingo", fechado: false, horarios: [] },
  ]);

  const getHorarios = () => {
    buscarTodosHorarios()
      .then((resp) => {
        // Cria uma nova cópia do estado dos dias
        setDias((prevDias) => {
          return prevDias.map((dia) => {
            // Encontrar o item da resposta que corresponde ao dia da semana
            const horariosDoDia = resp.filter(
              (item) => item.dia_semana === dia.dia.split("-")[0].trim()
            );

            // Se houver horários para esse dia, adiciona os horários sem duplicar
            if (horariosDoDia.length > 0) {
              return {
                ...dia,
                horarios: [
                  ...dia.horarios,
                  ...horariosDoDia
                    .map((horario) => ({
                      inicio: horario.hora_inicial,
                      fim: horario.hora_final,
                      id: horario.id,
                    }))
                    .filter(
                      (novoHorario) =>
                        !dia.horarios.some(
                          (horarioExistente) =>
                            horarioExistente.inicio === novoHorario.inicio &&
                            horarioExistente.fim === novoHorario.fim
                        )
                    ),
                ],
              };
            }

            // Caso não encontre, retorna o dia sem alterações
            return dia;
          });
        });
      })
      .catch(() => {
        toast.error("Erro ao buscar a lista de turnos", { theme: "colored" });
      });
  };

  useEffect(() => {
    getHorarios();
  }, []);

  const handleFechado = (dia) => {
    setCarregando(true);
    fecharDiaSemana(dia.dia.split("-")[0].trim())
      .then(() => {
        toast(`Todos os horário de atendimento de ${dia.dia} foram removidos!`);
        setDias((prevDias) =>
          prevDias.map((d) =>
            d.dia === dia.dia
              ? { ...d, fechado: true, horarios: [] }
              : d
          )
        );
        setCarregando(false);
      })
      .catch(() => {
        toast.error("Erro ao remover os horários de atendimento do dia.", {
          theme: "colored",
        });
        setCarregando(false);
      });
  };

  const handleAddHorario = (horaInicial, horaFinal) => {
    const token = localStorage.getItem("app-token");
    const payload = token ? jwtDecode(token) : "";

    const horaInicio = horaInicial;
    const horaFim = horaFinal;

    if (!horaInicio || !horaFim) {
      alert("Por favor, preencha tanto o horário de início quanto o de fim.");
      return;
    }

    const novoHorario = { inicio: horaInicio, fim: horaFim };

    setCarregando(true);
    cadastrarHorario({
      dia_semana: diaSelecionado.dia.split("-")[0].trim(),
      hora_inicial: horaInicio,
      hora_final: horaFim,
      id_profissional: payload.sub,
    })
      .then((resp) => {
        toast.success("Turno cadastrado com sucesso", { theme: "colored " });
        console.log(resp);
        setCarregando(false);
        setDias((prevDias) =>
          prevDias.map((d) =>
            d.dia === diaSelecionado.dia
              ? {
                  ...d,
                  horarios: [
                    ...d.horarios,
                    { ...novoHorario, id: resp.data.id },
                  ],
                }
              : d
          )
        );
        setDiaSelecionado(null);
        setOpenCadastro(false);
      })
      .catch(() => {
        toast.error("Erro ao cadastrar turno, por favor tente novamente", {
          theme: "colored",
        });
        setCarregando(false);
      });
  };

  const handleRemoveHorario = (dia, horario) => {
    setCarregando(true);
    const horarioId = horario.id;

    removerHorario(horarioId)
      .then(() => {
        setDias((prevDias) =>
          prevDias.map((d) =>
            d.dia === dia.dia
              ? { ...d, horarios: d.horarios.filter((h) => h.id !== horarioId) }
              : d
          )
        );
        toast.success("Turno removido com sucesso!", { theme: "colored" });
      })
      .catch(() => {
        toast.error("Erro ao remover o turno, por favor tente novamente", {
          theme: "colored",
        });
      })
      .finally(() => {
        setCarregando(false);
      });
  };

  return (
    <div className="p-8 overflow-y-auto w-full">
      <DialogHorario
        mostrar={openCadastro}
        titulo="Horário do turno"
        textoSim="Cadastrar"
        textoNao="Cancelar"
        callbackNao={() => {
          setOpenCadastro(false);
          setDiaSelecionado(null);
        }}
        callbackSim={(resp) => {
          handleAddHorario(resp.horaInicial, resp.horaFinal);
        }}
      />
      {dias.map((dia) => (
        <Accordion key={dia.dia}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${dia.dia}-content`}
            id={dia.dia}
          >
            <div className="flex justify-between w-full">
              <span className="text-lg font-semibold">{dia.dia}</span>
              {carregando ? (
                <CircularProgress />
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation(); // Impede que o clique no botão abra o accordion
                    setDiaSelecionado(dia);
                    setOpenCadastro(true);
                  }}
                  className="ml-4"
                >
                  Adicionar Turno
                </Button>
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {dia.horarios.length > 0 ? (
              <div className="space-y-4">
                {dia.horarios.map((turno, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span>
                      Inicia: {turno.inicio} - Termina: {turno.fim}
                    </span>
                    {carregando ? (
                      <CircularProgress />
                    ) : (
                      <IconButton
                        onClick={() => handleRemoveHorario(dia, turno)}
                        aria-label="Excluir turno"
                      >
                        <TrashIcon className="size-6 cursor-pointer mx-3 text-red-500" />
                      </IconButton>
                    )}
                  </div>
                ))}
                {dia.horarios.length >= 2 && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    className="w-full mt-4"
                    onClick={() => handleFechado(dia)}
                    disabled={carregando}
                  >
                    Remover todos os turnos
                  </Button>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Nenhum turno cadastrado</p>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
