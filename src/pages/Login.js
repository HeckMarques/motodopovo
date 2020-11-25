import React, { useState, useLayoutEffect } from 'react'

import {
    Button,
    Grid,
    Paper,
    TextField,
    Checkbox,
    Container
}
    from '@material-ui/core';

import Firebase from '../services/FirebaseConnect'
import { useHistory } from "react-router-dom";


function Login() {
    let history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")
    const [lembreme, setLembreme] = useState(false)


    useLayoutEffect(() => {

        // Firebase
        //     .database()
        //     .ref(`/ocorrencias`)
        //     .on('value', snapchot => {
        //         // converter objetos em listas
        //         if (snapchot.val()) {
        //             let dados = snapchot.val()
        //             const keys = Object.keys(dados)
        //             const lista = keys.map((key) => {
        //                 return { ...dados[key], id: key }
        //             })
        //             setLista(lista)
        //         } else {
        //             setLista([])
        //         }
        //     })

        // Firebase
        //     .database()
        //     .ref(`/postopolicial`)
        //     .on('value', snapchot => {
        //         // converter objetos em listas
        //         if (snapchot.val()) {
        //             let dados = snapchot.val()
        //             const keys = Object.keys(dados)
        //             const lista = keys.map((key) => {
        //                 return { ...dados[key], id: key }
        //             })
        //             setListaPolicia(lista)
        //         } else {
        //             setListaPolicia([])
        //         }
        //     })

        let emailStorage = localStorage.getItem("email")
        let passwordStorage = localStorage.getItem("password")
        if (emailStorage && passwordStorage) {
            setEmail(emailStorage)
            setPassword(passwordStorage)
            setLembreme(true)
        }

    }, [])


    const login = () => {

        if (lembreme == false) {
            localStorage.removeItem("email")
            localStorage.removeItem("password")
        }

        Firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((retorno) => {
                sessionStorage.setItem("uuid", retorno.user.uid)
                if (lembreme === true) {
                    localStorage.setItem("email", email)
                    localStorage.setItem("password", password)
                }
                setMsg("")
                setTimeout(() => {
                    history.push("/menu");
                }, 100);


            })
            .catch((erro) => {
                console.log(erro)
                setMsg("Usuário ou senha inválidos!")
            })
    }

    const Cadastrar = () => {
        history.push("/novaconta");

    }



    return (
        <div>
            <Container maxWidth="sm">

                <img width="200" height="200" style={{ marginLeft: "30%" }} src="../moto.png"></img>
                <br></br>
                <h2>Login</h2>
                <Paper elevation={0}>
                    <TextField
                        label="E-mail"
                        variant="outlined"
                        size="small"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: "100%", marginBottom: 10 }} />
                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Senha"
                        variant="outlined"
                        type="password"
                        size="small"
                        style={{ width: "100%", marginBottom: 10 }} />
                    <Grid item sm={12} xs={12} style={{ textAlign: "center" }}>
                        <Checkbox
                            checked={lembreme}
                            onChange={(e) => setLembreme(e.target.checked)}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        /> Lembre-me
                     </Grid>
                    <Grid item sm={12} xs={12} style={{ textAlign: "center", color: "red", marginBottom: 5, fontSize: 12 }}>
                        {msg}
                    </Grid>
                    <Button
                        onClick={login}
                        variant="outlined"
                        color="primary"
                        style={{ float: "right" }}>
                        Entrar
            </Button>
                    <Button
                        onClick={Cadastrar}
                        variant="outlined"
                        color="primary"
                        style={{ float: "right", marginRight: '5px' }}>
                        Criar conta
            </Button>
                </Paper>
            </Container>



        </div>
    );
}

export default Login;
