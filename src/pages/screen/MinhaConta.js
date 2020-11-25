import React, { useState, useLayoutEffect } from 'react'
import {
  Button,
  Grid,
  TextField,
}
  from '@material-ui/core';
import Firebase from '../../services/FirebaseConnect'

export default function MinhaConta() {

  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [idUser, setIdUser] = useState("")

  useLayoutEffect(() => {
    Firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user !== null) {
          setIdUser(user.uid)
          Firebase
            .database()
            .ref(`/users/${user.uid}`)
            .on("value", function (snapshot) {
              console.log(snapshot.val());
              setNome(snapshot.val().nome)
              setTelefone(snapshot.val().telefone)
            }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            });

        }
      })
  }, [])

  const salvarRegistro = () => {
    let objeto = {
      nome: nome,
      telefone: telefone,
    }
    Firebase
      .database()
      .ref(`users/${idUser}`)
      .update(objeto)
      .then(() => {
        alert('Informações de conta atualizadas!')
      })
      .catch((erro) => {
        console.log(erro)
      })

  }

  return (
    <Grid container spacing={1} >
      <Grid item sm={10} xs={12}>
        <TextField
          label="Nome"
          variant="outlined"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          size="small"
          style={{ width: "100%", marginBottom: 10 }} />
        <TextField
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          label="Telefone"
          variant="outlined"
          size="small"
          style={{ width: "100%", marginBottom: 10 }} />
        <Button
          variant="outlined"
          color="primary"
          onClick={salvarRegistro}
          style={{ float: "right" }}>
          Salvar
                </Button>
      </Grid>
    </Grid >

  )
}
