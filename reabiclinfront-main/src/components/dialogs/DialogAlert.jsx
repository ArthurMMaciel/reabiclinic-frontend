import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DialogAlert = (props) => {
    const handleClose = () => {
        props.callbackNao();
    };

    const handleSim = () => {
        props.callbackSim();
    };

    const handleVisualizar = () => {
        props.callbackVisualizar();
    };

    return (
        <Dialog
            open={props.mostrar}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">{props.titulo}</DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="alert-dialog-description"
                    style={{ maxHeight: "50%", overflowY: "auto" }}
                >
                    {props.mensagem}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {props.textoVisualizar ? (
                    <Button
                        onClick={handleVisualizar}
                        style={{ color: "lightgray" }}
                        autoFocus
                    >
                        {props.textoVisualizar}
                    </Button>
                ) : null}
                {props.callbackSim ? (
                    <Button
                        onClick={handleSim}
                        style={{ color: "lightgray" }}
                        autoFocus
                    >
                        {props.textoSim}
                    </Button>
                ) : null}
                <Button onClick={handleClose} style={{ color: "lightgray" }}>
                    {props.textoNao}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogAlert;
