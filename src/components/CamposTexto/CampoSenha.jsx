import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { forwardRef, useState } from "react";

const CampoSenha = forwardRef((props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };


    return (
        <>
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
                        borderRadius: "10px"
                    },
                    "& input:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 100px rgba(90, 149, 140, 1) inset", // Cor de fundo do autofill
                        WebkitTextFillColor: "white", // Cor do texto no autofill
                        WebkitBorderRadius: "10px" // Cor do texto no autofill
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
                type={showPassword ? "text" : "password"}
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
                autoComplete={props.cadastro ? "new-password" : "on"} 
                ref={ref}
                value={props.value}
            />
        </>
    );
});

CampoSenha.displayName = 'CampoSenha';

export default CampoSenha;