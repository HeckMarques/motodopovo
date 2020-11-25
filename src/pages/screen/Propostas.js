import React, { useState, useLayoutEffect } from 'react'
import {
    IconButton,
    Grid,
    Paper,
}
    from '@material-ui/core';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Firebase from '../../services/FirebaseConnect'

export default function Propostas(props) {

    const [lista, setLista] = useState([])

    useLayoutEffect(() => {

            Firebase
                .auth()
                .onAuthStateChanged(user => {
                    if (user !== null) {
                        BuscarPropostas(user.uid)
                    }
                })



    }, [])

    function BuscarPropostas(id) {
        console.log('buscando propostas...')
        Firebase
            .database()
            .ref(`/propostas/${id}`)
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


    return (
        <Grid container spacing={1} >
            <Grid item sm={12} xs={12}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Proposta</TableCell>
                                 <TableCell>Contato</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lista.map((item, key) => {
                                return <TableRow key={key}>
                                    <TableCell component="th" scope="row">
                                        {item.proposta}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {item.nome} -  {item.telefone}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" onClick={() => { window.open(`https://api.whatsapp.com/send?phone=${item.telefone}&text=oi`)}} aria-label="upload picture" component="span">
                                            <WhatsAppIcon />
                                        </IconButton>

                                    </TableCell>
                                </TableRow>
                            }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>


        </Grid>
    )
}
