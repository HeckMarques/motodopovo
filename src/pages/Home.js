import React, { useState, useLayoutEffect } from 'react'

import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Grid,
  Container,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
}
  from '@material-ui/core';

import { useHistory } from "react-router-dom";
import Firebase from '../services/FirebaseConnect'
import Footer from '../components/footer'

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
    maxWidth: 345,
    margin: "5px"
  },
  media: {
    height: 140,
  },
});


function Home() {
  let history = useHistory();
  const classes = useStyles();
  const classes2 = useStyles2();
  const [lista, setLista] = useState([])

  const login = () => {
    console.log('fazer login')
    history.push("/login");
  }

  useLayoutEffect(() => {
    buscarAnuncios()

  }, [])


  const buscarAnuncios = (id) => {
    console.log('Buscando anuncios ...')
    Firebase
      .database()
      .ref(`/anuncios`)
      .on('value', async snapchot => {
        // converter objetos em listas
        var anuncios = snapchot.val()
        if (anuncios) {
          //console.log(anuncios)
          var listaUpdate = []
          for (var id in anuncios) {
            if (anuncios.hasOwnProperty(id)) {
              var element = anuncios[id];

              let dados = element
              var keys = Object.keys(dados)
              var lista = await keys.map((key) => {
                return { ...dados[key], id: key }
              })
              for (let index = 0; index < lista.length; index++) {
                const element = lista[index];
                listaUpdate.push(element)

              }
              setTimeout(() => {
                setLista(listaUpdate)
              }, 200);
            }
          }

        } else {
          setLista([])
        }
      })
  }

  const anuncioCompleto = (item) => {
    history.push({
      pathname: '/anunciocompleto',
      search: '',
      state: { detail: item }
    });
  }


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
        <Typography gutterBottom variant="h5" component="h3" style={{ margin: "auto" }}>
          Seja bem vindo!
        </Typography>
        <br></br>
        <Grid container spacing={1}>

          {lista.map((item, key) => {
            return <Card className={classes2.root} onClick={() => anuncioCompleto(item)}>
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
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">VER Anúncio</Button>
              </CardActions>
            </Card>
          }
          )}


        </Grid>
      </Container>
      <Footer />

    </div>

  );
}

export default Home;
