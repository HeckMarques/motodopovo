import React, { useState, useLayoutEffect } from 'react'
import {
    Button,
    Grid,
    Paper,
}
    from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Firebase from '../../services/FirebaseConnect'

export default function ListaAnuncios(props) {

    const [lista, setLista] = useState([])
    const [idUser, setIdUser] = useState("")

    useLayoutEffect(() => {
        Firebase
            .auth()
            .onAuthStateChanged(user => {
                if (user !== null) {
                    setIdUser(user.uid)
                    console.log('tem user em crimeLista')
                    buscarAnuncios(user.uid)
                }
            })

    }, [])

    const buscarAnuncios = (id) => {
        console.log('Buscando anuncios ...')
        Firebase
            .database()
            .ref(`/anuncios/${id}`)
            .on('value', snapchot => {
                // converter objetos em listas
                if (snapchot.val()) {
                    let dados = snapchot.val()
                    const keys = Object.keys(dados)
                    const lista = keys.map((key) => {
                        return { ...dados[key], id: key }
                    })
                    setLista(lista)
                } else {
                    setLista([])
                }
            })
    }


    const excluir = async (item) => {
        await Firebase
            .database()
            .ref(`/anuncios/${idUser}/${item.id}`)
            .remove()
        setTimeout(() => {
            buscarAnuncios(idUser)
        }, 200);


    }

    return (
        <Grid container spacing={1} >
            <Grid item sm={12} xs={12}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Imagem</TableCell>
                                <TableCell align="right">Modelo</TableCell>
                                <TableCell align="right">Marca</TableCell>
                                <TableCell align="right">Preço</TableCell>
                                <TableCell align="right">ano</TableCell>
                                <TableCell align="right">opções</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lista.map((item, key) => {
                                return <TableRow key={key}>
                                    <TableCell component="th" scope="row">
                                        {item.imagem !== '' ?
                                            <>
                                                <img width="60" height="40" style={{ marginLeft: "5px" }} src={item.imagem}></img>
                                            </> : <> Sem imagem </>
                                        }
                                    </TableCell>
                                    <TableCell align="right">{item.modelo}</TableCell>
                                    <TableCell align="right">{item.marca}</TableCell>
                                    <TableCell align="right">{item.preco}</TableCell>
                                    <TableCell align="right">{item.ano}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => excluir(item)} color="secondary" aria-label="upload picture" component="span">
                                            <DeleteIcon />
                                        </IconButton>

                                    </TableCell>
                                </TableRow>
                            }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item sm={12} xs={12}>
                <Button
                    variant="contained"
                    onClick={() => props.setScreen(2)}
                    color="primary"
                    startIcon={<AddCircleIcon />}>
                    Novo anúncio
                    </Button>

            </Grid>


        </Grid>
    )
}
