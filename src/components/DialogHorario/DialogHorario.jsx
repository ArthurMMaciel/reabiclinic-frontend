import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { ptBR } from "@mui/x-date-pickers/locales";

const DialogHorario = (props) => {
  const [horaInicial, setHoraInicial] = useState(null);
  const [horaFinal, setHoraFinal] = useState(null);

  useEffect(() => {
    setHoraFinal(null);
    setHoraFinal(null);
  }, []);

  // Função para ajustar os minutos para os múltiplos de 5
  const ajustarMinutos = (hora) => {
    if (!hora) return hora; // Se não houver hora, retorna o valor atual
    const minutos = hora.minute();
    const minutosAjustados = Math.round(minutos / 5) * 5; // Arredonda para o múltiplo mais próximo de 5
    return hora.minute(minutosAjustados); // Retorna a hora ajustada
  };

  const handleClose = () => {
    props.callbackNao();
    setHoraInicial(null); // Resetando os valores
    setHoraFinal(null);
  };

  const handleSim = async () => {
    if (!horaInicial || !horaFinal) {
      toast.error("Preencha os campos de hora inicial e final.", {
        theme: "colored",
      });
      return;
    }

    // Verifica se a hora inicial é menor que a hora final
    if (horaInicial.isAfter(horaFinal)) {
      toast.error("A hora inicial deve ser menor que a hora final.", {
        theme: "colored",
      });
      return;
    }

    // Verifica se as duas horas são diferentes
    if (horaInicial.isSame(horaFinal)) {
      toast.error("A hora inicial não pode ser igual à hora final.", {
        theme: "colored",
      });
      return;
    }

    // Verifica se há pelo menos 5 minutos de intervalo entre as duas horas
    const intervaloMinutos = horaFinal.diff(horaInicial, "minute");
    if (intervaloMinutos < 5) {
      toast.error(
        "O intervalo entre as horas deve ser de pelo menos 5 minutos.",
        {
          theme: "colored",
        }
      );
      return;
    }

    try {
      props.callbackSim({
        horaInicial: horaInicial.format("HH:mm"), // Formato de 24 horas
        horaFinal: horaFinal.format("HH:mm"), // Formato de 24 horas
      });
      setHoraInicial(null);
      setHoraFinal(null);
    } catch (error) {
      toast.error(`Erro ao obter os horários: ${error.message}`, {
        theme: "colored",
      });
    }
  };

  return (
    <Dialog
      open={props.mostrar}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={"md"}
      disableRestoreFocus
    >
      <DialogTitle id="alert-dialog-title">{props.titulo}</DialogTitle>
      <DialogContent>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={
            ptBR.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <div className="p-4 px-5 gap-1 flex items-center select-none mb-2">
            <MobileTimePicker
              className="mx-5 w-40 font-raleway"
              label="Hora Inicial"
              value={horaInicial}
              onChange={(newHora) => setHoraInicial(ajustarMinutos(newHora))}
              ampm={false} // Garante que o formato seja de 24 horas
              inputFormat="HH:mm" // Definindo o formato 24h
            />
            <MobileTimePicker
              className="mx-5 w-40 font-raleway"
              label="Hora Final"
              value={horaFinal}
              onChange={(newHora) => setHoraFinal(ajustarMinutos(newHora))}
              ampm={false} // Garante que o formato seja de 24 horas
              inputFormat="HH:mm" // Definindo o formato 24h
            />
          </div>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          style={{
            color: "#f2f2f2",
            background: "red",
            fontFamily: `"Roboto", sans-serif`,
            fontWeight: "bold",
            borderRadius: "7px",
          }}
        >
          {props.textoNao}
        </Button>
        {props.callbackSim ? (
          <Button
            onClick={handleSim}
            autoFocus
            type="submit"
            style={{
              color: "#f2f2f2",
              background: "green",
              fontFamily: `"Roboto", sans-serif`,
              fontWeight: "bold",
              borderRadius: "7px",
            }}
          >
            {props.textoSim}
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

export default DialogHorario;
