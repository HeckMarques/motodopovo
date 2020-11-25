import React, { useState, useLayoutEffect } from 'react'

import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Container,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  TextField,
  IconButton
}
  from '@material-ui/core';

import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { useHistory } from "react-router-dom";
import Firebase from '../services/FirebaseConnect'
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const useStyles2 = makeStyles({
  root: {
    maxWidth: 500,
    margin: "auto",

  },
  media: {
    height: 300,
  },
});


function AnuncioCompleto(props) {
  let history = useHistory();
  const classes = useStyles();
  const classes2 = useStyles2();
  const item = props.location.state.detail
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [proposta, setProposta] = useState("")
  const [pnome, setPnome] = useState("")
  const [ptelefone, setPtelefone] = useState("")

  const login = () => {
    console.log('fazer login')
    history.push("/login");
  }

  const enviar = () => {
    let code = uuidv4()
    let objeto = {
      key: code,
      proposta: proposta,
      nome: pnome,
      telefone: ptelefone,
    }
    Firebase
      .database()
      .ref(`propostas/${item.keyAnunciante}/${code}`)
      .set(objeto)
      .then(() => {
        alert('Proposta enviada com sucesso!')
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  useLayoutEffect(() => {
    Firebase
      .database()
      .ref(`/users/${item.keyAnunciante}`)
      .on("value", function (snapshot) {
        setNome(snapshot.val().nome)
        setTelefone(snapshot.val().telefone)
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

  }, [])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img width="50" height="50" style={{ marginRight: "10px" }} src="../moto2.png"></img>
          <Typography variant="h6" className={classes.title}>
            Moto do Povo
          </Typography>
          <Button color="inherit" onClick={login}>Fazer Login</Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "20px" }}>

        <Card className={classes2.root}>
          <CardActionArea>
            {item.imagem !== '' ?
              <>
                <CardMedia
                  className={classes2.media}
                  image={item.imagem}
                  title="Moto do povo Direito reservado"
                />
              </> : <> <CardMedia
                className={classes2.media}
                image='../semimagem.jpg'
                title="Moto do povo Direito reservado"
              /> </>
            }
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.modelo} R$: {item.preco}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Marca: {item.marca}; Ano: {item.ano}
              </Typography>
                <br></br>

              <Typography gutterBottom variant="h5" component="h2">
                Vendedor
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {nome} - {telefone}
                <IconButton color="primary" onClick={() => { window.open(`https://api.whatsapp.com/send?phone=${telefone}&text=oi`) }} aria-label="upload picture" component="span">
                  <WhatsAppIcon />
                </IconButton>
              </Typography>
              <br></br>

            </CardContent>
          </CardActionArea>
          <Container>
            <Typography gutterBottom variant="h5" component="h2">
              Faça uma proposta:
              </Typography>
            <TextField
              label="Proposta"
              variant="outlined"
              value={proposta}
              onChange={(e) => setProposta(e.target.value)}
              size="small"
              style={{ width: "100%", marginBottom: 10 }} />
            <TextField
              label="Seu nome"
              variant="outlined"
              value={pnome}
              onChange={(e) => setPnome(e.target.value)}
              size="small"
              style={{ width: "100%", marginBottom: 10 }} />
            <TextField
              label="Seu telefone"
              variant="outlined"
              value={ptelefone}
              onChange={(e) => setPtelefone(e.target.value)}
              size="small"
              style={{ width: "100%", marginBottom: 10 }} />
            <Button
              variant="outlined"
              color="primary"
              onClick={enviar}
              style={{ float: "right", marginBottom: '10px' }}>
              Enviar
                </Button>
          </Container>

        </Card>

      </Container>
    </div>

  );
}

export default AnuncioCompleto;
