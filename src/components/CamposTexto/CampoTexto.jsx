import React, { forwardRef } from "react";
import { TextField } from "@mui/material";

const CampoTexto = forwardRef((props, ref) => {
    return (
            <TextField
                sx={{
                    "& .MuiOutlinedInput-root": {
                        color: "white",
                        "&:hover fieldset": {
                            boxShadow: "0 4px 4px rgba(0, 0, 0, .5)",
                            borderColor:"rgba(66, 156, 146, 1)"
                        },
                        "&.Mui-focused fieldset": {
                            boxShadow: "0 4px 4px rgba(0, 0, 0, .5)",
                            borderColor:"rgba(66, 156, 146, 1)"
                        },
                        borderRadius:"10px"
                    },
                    "& input:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 100px rgba(90, 149, 140, 1) inset", // Cor de fundo do autofill
                        WebkitTextFillColor: "white", // Cor do texto no autofill
                        WebkitBorderRadius: "10px"
                    },
                    ...(props.cadastro && {
                        // Estilos específicos apenas para o modo "cadastro"
                        "& input:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 100px rgba(90, 149, 140, 1) inset",
                            WebkitTextFillColor: "white",
                            WebkitBorderRadius: "10px"
                        }
                    }),
                    backgroundColor: "rgba(90, 149, 140, 1)",
                    borderRadius: "10px"
                }}
                label={props.label}
                type="text"
                fullWidth
                required={props.required}
                variant="outlined"
                margin="normal"
                onChange={props.onChange}
                slotProps={{
                    inputLabel: {
                        sx: {
                            color: "white", // Cor padrão do label
                            "&.Mui-focused": {
                                color: "white", // Cor do label quando o campo está em foco
                            },
                        },
                    }
                }}
                autoComplete={props.cadastro ? "new-password" : "on"} 
                ref={ref}
                value={props.value}
            />
    );
})

CampoTexto.displayName = 'CampoTexto';

export default CampoTexto;