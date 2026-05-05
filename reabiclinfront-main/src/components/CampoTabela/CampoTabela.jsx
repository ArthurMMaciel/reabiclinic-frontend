import React, { useContext, useEffect, useRef, useState } from "react";
import {
    DataGrid,
    GridToolbar,
    GridToolbarContainer,
    useGridApiRef,
} from "@mui/x-data-grid";
import { ptBR } from '@mui/x-data-grid/locales';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Papa from "papaparse";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, createTheme, styled } from "@mui/material";
import { FiltroContext } from "../../context/FiltroContext";

const CustomDataGrid = styled(DataGrid)(({ theme }) => ({
    "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "#58A9A0",
        color: "white",
        borderBottom: "none",
    },
    "& .MuiDataGrid-cell": {
        borderBottom: "none",
    },
    "& .MuiDataGrid-footerContainer": {
        backgroundColor: "#58A9A0",
    },
}));

const CampoTabela = (props) => {
    const [selectionModel, setSelectionModel] = useState([]);
    const [columnVisibilityModel, setColumnVisibilityModel] = useState(
        (props.columns ?? []).reduce((objetoResultado, item) => {
            objetoResultado[item.field] = true;
            return objetoResultado;
        }, {})
    );
    const apiRef = useGridApiRef();
    const inputRef = useRef(null);
    const [pageSize, setPageSize] = useState(props.linhas ?? 0);
    const [page, setPage] = useState(props.pagina ?? 0);
    const [rowsTabela, setRowsTabela] = useState(props.rowss);
    const [rowCountState, setRowCountState] = useState(props.total ?? 0);
    const filtroContext = useContext(FiltroContext);
    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbar
                    sx={{
                        "& .MuiSvgIcon-root": {
                            color: "white",
                        },
                        "& .MuiButton-text": {
                            color: "white",
                            backgroundColor: "#58A9A0",
                            marginRight: "5px",
                            padding: "10px 20px",
                            fontFamily: "Raleway"
                        },
                        "& .MuiButton-text:hover": {
                            backgroundColor: "red",
                        },
                        marginBottom: "5px",
                    }}
                    csvOptions={{
                        disableToolbarButton: true,
                    }}
                    printOptions={{
                        disableToolbarButton: true,
                    }}
                />
            </GridToolbarContainer>
        );
    };

    const handlePage = (paginas) => {
        setSelectionModel([]);
        props.changePage(paginas);
        setPage(paginas);
    };

    const handleLinhas = (linhas) => {
        setSelectionModel([]);
        setPage(0);
        props.changePage(0);
        props.changeLinhas(linhas);
        setPageSize(linhas);
    };

    const handleFiltro = (filtro) => {
        setSelectionModel([]);
        props.changeFiltro(filtro);

        let filter =
            filtro.items.length > 0
                ? {
                    field: filtro.items[0].columnField,
                    operator: filtro.items[0].operatorValue,
                    value:
                        filtro.items[0].columnField === "data" ||
                            filtro.items[0].columnField === "data_criacao"
                            ? filtro.items[0].value +
                            retornaTimeZone(
                                new Date(filtro.items[0].value).getTimezoneOffset() / 60
                            )
                            : filtro.items[0].value,
                }
                : {
                    field: "",
                    operator: "",
                    value: "",
                };
        try {
            console.log("Usando filtro", filter);
            filtroContext.dispatch({ type: "incrementarFiltro", value: filter });
        } catch (error) {
            console.log(error);
        }
    };

    const retornaTimeZone = (fuso) => {
        switch (fuso) {
            case 2:
                return "-02:00";
            case 3:
                return "-03:00";
            case 4:
                return "-04:00";
            case 5:
                return "-05:00";
            default:
                return "00:00";
        }
    };

    const handleFile = (event) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (result) {
                const columnArray = [];
                const valuesArray = [];
                result.data.map((d) => {
                    columnArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));
                });
                props.setDados(result.data);
            },
        });
    };

    const apagaDados = () => {
        inputRef.current.value = null;
        props.limpaTabela();
    };

    useEffect(() => {
        setSelectionModel([]);
    }, [props.dataInicial, props.dataFinal]);

    useEffect(() => {
        const savedModel = localStorage.getItem(
            `columnVisibilityModel-${props.titulo}`
        );
        if (savedModel) {
            setColumnVisibilityModel(JSON.parse(savedModel));
        } else {
            (props.columns ?? []).reduce((objetoResultado, item) => {
                objetoResultado[item.field] = true;
                return objetoResultado;
            }, {});
        }
    }, [props.columns]);

    useEffect(() => {
        localStorage.setItem(
            `columnVisibilityModel-${props.titulo}`,
            JSON.stringify(columnVisibilityModel)
        );
    }, [columnVisibilityModel]);

    useEffect(() => {
        setRowsTabela(props.rowss);
        setRowCountState((prevRowCountState) =>
            props.total !== undefined ? Number(props.total) : (prevRowCountState ?? 0)
        );
        setPage(props.pagina);
    }, [props.rowss, props.total, setRowCountState, props.pagina]);

    return (
        <Box
            height="63vh"
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                    color: "black"
                },
                "& .name-column--cell": {
                    color: "red",
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#58A9A0 !important",
                    color: "white !important",
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: "#B3CFC6",
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: "#58A9A0",
                },
                "& .MuiCheckbox-root": {
                    color: `lightgreen !important`,
                },
                "& .MuiButtonBase-root svg": {
                    color: "white", 
                },
                "& .MuiSelect-icon": {
                    color: "white",
                },
                "& .MuiSelect-select": {
                    color: "white", 
                },
                "& .MuiDataGrid-row.even": {
                    backgroundColor: "#DFEFEA",
                },
                "& .MuiDataGrid-row.odd": {
                    backgroundColor: "#ffffff",
                },
            }}
        >
            <DataGrid
                {...(props.orderByProps
                    ? {
                        initialState: {
                            sorting: {
                                sortModel: [{ field: props.field, sort: props.sort }],
                            },
                        },
                    }
                    : {})}
                {...(props.checkboxSelection
                    ? {
                        checkboxSelection: true,
                        onSelectionModelChange: (newRowSelectionModel) => {
                            setSelectionModel(newRowSelectionModel);
                            props.onRowSelectionModelChange(newRowSelectionModel);
                        },
                        selectionModel: selectionModel,
                    }
                    : {})}
                rowHeight={60}
                sx={{
                    "& .MuiButton-text": { fontSize: "12px", height: "10px", color: "white" },
                    "& .MuiButton-iconButtonContainer": { color: "white" },
                    "& .MuiDataGrid-footerContainer": {
                        maxHeight: 20,
                        padding: 0,
                        margin: 0,
                        "& p": {
                            color: "white",
                            fontFamily: "raleway",
                            fontSize: "12px",
                            margin: 0,
                            padding: 0,
                        },
                    },
                    border: "0px solid transparent",
                    marginTop: "50px"
                }}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) => {
                    const colunasVisiveis = (props.columns ?? []).reduce(
                        (objetoResultado, item) => {
                            objetoResultado[item.field] = true;
                            return objetoResultado;
                        },
                        {}
                    );
                    if (Object.keys(newModel).length === 0) {
                        setColumnVisibilityModel(colunasVisiveis);
                        return;
                    }
                    const visibilityModel = { ...columnVisibilityModel, ...newModel };
                    setColumnVisibilityModel(visibilityModel);
                }}
                apiRef={apiRef}
                rows={rowsTabela}
                {...props}
                disableVirtualization
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                page={page}
                pageSize={pageSize}
                onPageChange={(page) => {
                    handlePage(page);
                }}
                paginationMode={props.serverOrder ? "server" : "client"}
                sortingMode={props.serverOrder ? "server" : "client"}
                rowCount={rowCountState}
                onPageSizeChange={(newPageSize) => {
                    handleLinhas(newPageSize);
                }}
                {...(props.serverOrder
                    ? {
                        onSortModelChange: (sort) => props.changeOrder(sort[0]),
                    }
                    : {})}
                rowsPerPageOptions={[25, 50, 100]}
                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                }
                style={{
                    height: props.altura ? props.altura : "100%",
                    width: props.largura ? props.largura : null,
                }}
                components={{
                    Toolbar: CustomToolbar,
                }}
                density="compact"
                filterMode={props.serverOrder ? "server" : "client"}
                onFilterModelChange={(filtro) => handleFiltro(filtro)}
                hideFooterRowCount={props.escondeContadorDeLinha ? true : false}
                hideFooterPagination={props.escondePaginacao ? true : false}
                hideFooter={props.escondeRodaPe ? true : false}
                disableColumnFilter={props.escondeFiltro ? true : false}
            />
            <button
                style={{
                    display: props.importar ? "inline-flex" : "none",
                    marginRight: "10px",
                    float: "right",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    boxSizing: "border-box",
                    backgroundColor: "cyan",
                    outline: 0,
                    border: 0,
                    margin: "5px 1px",
                    padding: 5,
                    cursor: "pointer",
                    userSelect: "none",
                    verticalAlign: "middle",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "0.8125rem",
                    lineHeight: 1.75,
                    letterSpacing: "0.02857em",
                    textTransform: "uppercase",
                    minWidth: "64px",
                    borderRadius: "10px",
                    color: "lightgray",
                }}
                type="button"
                onClick={() => {
                    return false;
                }}
            >
                <UploadFileIcon
                    style={{ fontSize: "17px", marginRight: "5px", marginLeft: "5px" }}
                />
                <label
                    htmlFor="getFile"
                    style={{ marginTop: "5px", cursor: "pointer" }}
                >
                    Importar .csv
                </label>
            </button>
            <input
                ref={inputRef}
                id="getFile"
                type="file"
                name="file"
                accept=".csv"
                onChange={handleFile}
                style={{ display: "none" }}
            />

            <button
                style={{
                    display: props.limpar ? "inline-flex" : "none",
                    marginRight: "10px",
                    float: "right",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    boxSizing: "border-box",
                    backgroundColor: "cyan",
                    outline: 0,
                    border: 0,
                    margin: "5px 1px",
                    padding: 5,
                    cursor: "pointer",
                    userSelect: "none",
                    verticalAlign: "middle",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "0.8125rem",
                    lineHeight: 1.75,
                    letterSpacing: "0.02857em",
                    textTransform: "uppercase",
                    minWidth: "64px",
                    borderRadius: "10px",
                    color: "lightgray",
                }}
                type="button"
                onClick={() => apagaDados()}
            >
                <DeleteIcon
                    style={{ fontSize: "17px", marginRight: "5px", marginLeft: "5px" }}
                />
                <label style={{ marginTop: "5px", cursor: "pointer" }}>
                    Limpar Dados
                </label>
            </button>
        </Box>
    );
};
export default CampoTabela;
