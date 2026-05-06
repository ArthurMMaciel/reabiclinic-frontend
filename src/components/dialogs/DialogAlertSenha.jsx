import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CampoSenha from "../CamposTexto/CampoSenha";
import { alterarSenha } from "../../chamadasApi/usuarioApi";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const DialogAlertSenha = (props) => {
    const currentURL = window.location.href;
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const campoTextoRef = useRef(null);
    const token = localStorage.getItem("app-token");
    const payload = jwtDecode(token) ?? null;

    const handleClose = () => {
        setSenha("");
        setConfirmarSenha("");
        props.callbackNao();
    };

    const handleSim = () => {
        let value = {
            senha: senha
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
        alterarSenha(payload.sub, value)
            .then(() => {
                toast.success("Senha alterada com sucesso", { theme: "colored" });
                setSenha("");
                setConfirmarSenha("");
                history.push(currentURL.substring(currentURL.lastIndexOf("/")));
            })
            .catch(error => console.log(error))
    };

    return (
        <Dialog
            open={props.mostrar}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
            fullWidth
            PaperProps={{
                style: {
                    backgroundColor: 'rgba(66, 156, 146, .8)',
                    boxShadow: '2px 2px 10px 1px #888888',
                    borderRadius: "20px"
                },
            }}
        >
            <DialogTitle id="alert-dialog-title" sx={{ fontFamily: "Raleway", color: "white" }}>{props.titulo}</DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="alert-dialog-description"
                    style={{ maxHeight: "50%", overflowY: "auto" }}
                    sx={{ fontFamily: "Raleway" }}
                >
                    <div className="flex gap-2">
                        <CampoSenha
                            style={{ width: "97%", margin: "12px" }}
                            label="Senha"
                            required
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            ref={campoTextoRef}
                            cadastro
                        />

                        <CampoSenha
                            style={{ width: "97%", margin: "12px" }}
                            label="Confirma Senha"
                            required
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            ref={campoTextoRef}
                            cadastro
                        />
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleSim}
                    style={{ color: "lightgray" }}
                    autoFocus
                    sx={{ fontFamily: "Raleway" }}
                >
                    {props.textoSim}
                </Button>
                <Button onClick={handleClose} style={{ color: "lightgray" }} sx={{ fontFamily: "Raleway" }}>
                    {props.textoNao}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogAlertSenha;

