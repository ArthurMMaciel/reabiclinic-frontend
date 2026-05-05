import React, { useEffect, useState } from "react";
import CampoTabela from "../../components/CampoTabela/CampoTabela";
import DialogAlert from "../../components/dialogs/DialogAlert";
import { Box, Fab, IconButton, styled, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { buscarTodosUsuarios } from "../../chamadasApi/usuarioApi";
import { history } from "../../history";
import EditIcon from '@mui/icons-material/Edit';

const StyledFab = styled(Fab)({
    position: "absolute !important",
    // top: -30,
    // left: "0 !important",
    right: "0 !important",
    margin: "50 auto !important",
});

const Profissional = () => {
    const [profissionais, setProfissionais] = useState([]);
    const [codigoAlterarProfissional, setCodigoAlterarProfissional] = useState(-1);
    const [idAlterar, setIdAlterar] = useState(-1);
    const [mostrarExcluir, setMostrarExcluir] = useState(false);
    const [mostrarAtivar, setMostrarAtivar] = useState(false);
    const [codDesativar, setCodDesativar] = useState(-1);
    const [colunaOrdem, setColunaOrdem] = useState("");
    const [filtro, setFiltro] = useState("");
    const [contador, setContador] = useState("0");
    const [page, setPage] = useState(0);
    const [linhasPorPagina, setLinhasPorPagina] = useState(25);
    const [ordem, setOrdem] = useState("");

    const [mostrarCadastro, setMostrarCadastro] = useState(false);
    const [mostrarAlterar, setMostrarAlterar] = useState(false);
    const [buscando, setBuscando] = useState(true);
    const colunas = [
        {
            field: "id",
            headerName: "ID",
            renderHeader: () => <strong style={{ fontSize: "12px" }}>ID</strong>,
            align: "right",
            type: "number",
            width: 120,
        },
        {
            field: "login",
            headerName: "Login",
            renderHeader: () => <strong style={{ fontSize: "12px" }}>Login</strong>,
            align: "left",
            width: 180,
        },
        {
            field: "nomeCompleto",
            headerName: "Nome",
            renderHeader: () => <strong style={{ fontSize: "12px" }}>Nome</strong>,
            align: "left",
            width: 180,
        },
        {
            field: "email",
            headerName: "E-mail",
            renderHeader: () => <strong style={{ fontSize: "12px" }}>E-mail</strong>,
            align: "left",
            width: 180,
        },
        {
            field: "especialidade",
            headerName: "Especialidade",
            renderHeader: () => <strong style={{ fontSize: "12px" }}>Especialidade</strong>,
            align: "left",
            width: 180,
        },
        {
            field: "remover",
            headerName: "Remover",
            renderHeader: () => <strong style={{ fontSize: "12px" }}></strong>,
            renderCell: (params) => {
              return (
                <Tooltip
                  title="Editar profissional"
                >
                  <IconButton
                    onClick={(ev) => {
                      ev.stopPropagation();
                      console.log(params.row);
                        alterar(params.row);
                    }}
                  >  
                      <EditIcon fontSize="small" style={{ color: "black" }} />
                  </IconButton>
                </Tooltip>
              );
            },
            width: 40,
            align: "center",
            hide: false,
            sortable: false,
            filterable: false,
          },
    ];
    const alterar = (usuario) => {
        history.push("cadastro-profissional", {
            idUsuario: usuario.id,
            edicao: true,
        });
    };
    const fecharDialogs = () => {
        setMostrarAlterar(false);
        setMostrarExcluir(false);
        setMostrarAtivar(false);
        setIdAlterar(-1);
        setMostrarCadastro(false);
        setCodigoAlterarProfissional(-1);
    };

    const handlePagina = (pagina) => {
        setPage(pagina);
    };

    const handleLimite = (linhas) => {
        setLinhasPorPagina(linhas);
        setPage(0);
    };

    const handleFiltro = (filtro) => {
        let filter =
            filtro.items.length > 0
                ? {
                    field: filtro.items[0].columnField,
                    operator: filtro.items[0].operatorValue,
                    value: filtro.items[0].value,
                }
                : {
                    field: "",
                    operator: "",
                    value: "",
                };
        setPage(0);
        setFiltro(
            filter.value !== "" &&
                filter.value !== undefined &&
                (typeof filter.value == "string" ||
                    (Array.isArray(filter.value) && filter.value.length > 0))
                ? filter
                : ""
        );
    };

    const handleSort = (ordenacao) => {
        setPage(0);
        setColunaOrdem(ordenacao ? ordenacao.field : "");
        setOrdem(ordenacao ? ordenacao.sort : "");
    };

    const getUsuarios = () => {
        buscarTodosUsuarios(filtro, colunaOrdem, ordem, linhasPorPagina, page)
            .then(data => {
                setProfissionais(data.usuarios)
                setContador(data.contador)
                setBuscando(false)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getUsuarios()
    }, [linhasPorPagina, page, ordem, colunaOrdem, filtro]);

    return (
        <div>
            <div className="flex flex-col items-center justify-center w-screen" style={{ height: "80vh" }}>
                <Box
                    sx={{
                        padding: "30px",
                        width: "100%"
                    }}
                >
                    <DialogAlert
                        mostrar={mostrarAlterar}
                        titulo="Deseja editar a agência?"
                        mensagem={`Deseja editar a agência ${idAlterar}?`}
                        textoSim="Sim"
                        textoNao="Não"
                        callbackNao={() => fecharDialogs()}
                        callbackSim={() => {
                            history.push("cadastro-agencias", {
                                idAgencia: idAlterar,
                                edicao: true,
                            });
                        }}
                    />
                    <CampoTabela
                        serverOrder
                        getRowId={(row) => row.id}
                        rows={profissionais}
                        columns={colunas}
                        altura="97.5%"
                        // onRowClick={(params) => {
                        //     alterar(params.row);
                        //     setCodigoAlterarProfissional(params.row.id);
                        // }}
                        changeFiltro={(filtro) => {
                            if (filtro.items.length > 0) {
                                handleFiltro(filtro);
                            }
                        }}
                        changePage={(paginas) => handlePagina(paginas)}
                        changeLinhas={(linhas) => handleLimite(linhas)}
                        changeOrder={(ordenacao) => {
                            handleSort(ordenacao);
                        }}
                        total={Number(contador)}
                        pagina={Number(page)}
                        linhas={Number(linhasPorPagina)}
                        loading={buscando}
                        disableSelectionOnClick
                        data-cy={"tabelaProfissionais"}
                    />
                </Box>
            </div>
            <StyledFab
                sx={{
                    color: "white",
                    bgcolor: "#58A9A0",
                    ':hover': {
                        bgcolor: "#5A958C",
                    },
                }}
                aria-label="add"
                id="botaoAdd"
                onClick={() => history.push("/cadastro-profissional")}
            >
                <AddIcon />
            </StyledFab>
        </div>

    );
}

export default Profissional