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


function NovoCadastro() {
  let history = useHistory();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [msg, setMsg] = useState("")
  const [lembreme, setLembreme] = useState(false)


  useLayoutEffect(() => {

  }, [])


  const Cadastrar = () => {

    if (email != '' && password != '' && nome != '' && telefone != '') {
      Firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((retorno) => {
          sessionStorage.setItem("uuid", retorno.user.uid)
          let objeto = {
            key: retorno.user.uid,
            email: email,
            nome: nome,
            telefone: telefone
          }
          Firebase
            .database()
            .ref(`users/${retorno.user.uid}`)
            .set(objeto)
            .then(() => {
              setTimeout(() => {
                history.push("/menu");
              }, 100);
            })
            .catch((erro) => {
              console.log(erro)
            })





        })
        .catch((erro) => {
          console.log(erro)
          setMsg("Informe e-mail e senha para se cadastrar!")
        })
    } else {
      setMsg("Todos os campos são obrigatorios!")
    }


  }



  return (
    <div>
      <Container maxWidth="sm">
        <img width="200" height="200" style={{ marginLeft: "30%" }} src="../moto.png"></img>
        <br></br>
        <h2>Nova Conta</h2>
        <Paper elevation={0}>
          <TextField
            label="* E-mail"
            variant="outlined"
            size="small"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", marginBottom: 10 }} />
          <TextField
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            label="* Nome"
            variant="outlined"
            size="small"
            style={{ width: "100%", marginBottom: 10 }} />
          <TextField
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            label="* Telefone"
            variant="outlined"
            size="small"
            style={{ width: "100%", marginBottom: 10 }} />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="* Senha (min 6 digitos)"
            variant="outlined"
            type="password"
            size="small"
            style={{ width: "100%", marginBottom: 10 }} />


          <Button
            onClick={Cadastrar}
            variant="outlined"
            color="primary"
            style={{ float: "right", marginRight: '5px' }}>
            Cadastrar
            </Button>
        </Paper>
      </Container>



    </div>
  );
}

export default NovoCadastro;
