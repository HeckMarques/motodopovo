import React, { useState, useLayoutEffect } from 'react'
import {
    Button,
    Grid,
    Paper,
    TextField,
    Checkbox,
    MenuList,
    MenuItem,
}
    from '@material-ui/core';
import Firebase from '../../services/FirebaseConnect'
import { v4 as uuidv4 } from 'uuid';

export default function NovoAnuncio(props) {



    const [modelo, setModelo] = useState("")
    const [preco, setPreco] = useState("")
    const [ano, setAno] = useState("")
    const [marca, setMarca] = useState("")
    const [imagem, setImagem] = useState("")
    const [idUser, setIdUser] = useState("")

    const limpar = () => {
        setModelo("")
        setPreco("")
        setAno("")
        setMarca("")
        setImagem("")
    }

    useLayoutEffect(() => {
        Firebase
            .auth()
            .onAuthStateChanged(user => {
                if (user !== null) {
                    setIdUser(user.uid)
                }
            })
    }, [])

    const salvarRegistro = () => {

        let code = uuidv4()
        let objeto = {
            key: code,
            keyAnunciante: idUser,
            modelo: modelo,
            ano: ano,
            preco: preco,
            marca: marca,
            imagem: imagem,
        }
        Firebase
            .database()
            .ref(`anuncios/${idUser}/${code}`)
            .set(objeto)
            .then(() => {
                limpar()
                props.setScreen(1)
            })
            .catch((erro) => {
                console.log(erro)
            })

    }

    return (
        <Grid container spacing={1} >
            <Grid item sm={10} xs={12}>
                <TextField
                    label="Modelo"
                    variant="outlined"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />
                <TextField
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    label="Preço"
                    variant="outlined"
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />
                <TextField
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                    label="Ano fabricação"
                    variant="outlined"
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />
                <TextField
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    label="Marca"
                    variant="outlined"
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />
                <TextField
                    value={imagem}
                    onChange={(e) => setImagem(e.target.value)}
                    label="Link imagem"
                    variant="outlined"
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={salvarRegistro}
                    style={{ float: "right" }}>
                    Anunciar agora
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => props.setScreen(1)}
                    style={{ float: "right" }}>
                    Cancelar
                </Button>
            </Grid>
        </Grid >

    )
}
