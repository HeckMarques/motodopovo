import React, { useState, useLayoutEffect } from 'react'

import {
    Button,
    Grid,
    Paper,
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    MenuList,
    MenuItem,
}
    from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";
import Firebase from '../services/FirebaseConnect'
import NovoAnuncio from './screen/NovoAnuncio'
import ListaAnuncios from './screen/ListaAnuncios'
import Propostas from './screen/Propostas'
import MinhaConta from './screen/MinhaConta'



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

export default function Menu() {
    let history = useHistory();
    const classes = useStyles();
    const [screen, setScreen] = useState(1)

    const logoff = () => {
        sessionStorage.removeItem("uuid")
        Firebase
            .auth()
            .signOut()
            .then(() => {
                history.push("/login");
            }).catch(() => {
                history.push("/");
            })
    }

    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <img width="50" height="50" style={{ marginRight: "10px" }} src="../moto2.png"></img>
                        <Typography variant="h6" className={classes.title}>
                            Moto do Povo
          </Typography>
                        <Button
                            onClick={logoff}
                            variant="contained"
                            color="primary"
                            startIcon={<ExitToAppIcon />}>
                            Logoff
                    </Button>
                    </Toolbar>
                </AppBar>
            </div>
            <Grid container spacing={1} style={{ marginTop: "20px" }}>


                <Grid item sm={2} xs={12}>
                    <Grid item sm={12} xs={12}>
                        <Paper>
                            <MenuList>
                                <MenuItem onClick={() => setScreen(1)}>Meus anúncios</MenuItem>
                                <MenuItem onClick={() => setScreen(3)}>Propostas</MenuItem>
                                <MenuItem onClick={() => setScreen(0)}>Minha conta</MenuItem>
                            </MenuList>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item sm={10} xs={12}>
                    <Paper>
                        {screen == 0 &&
                            <MinhaConta setScreen={setScreen} />
                        }
                        {screen == 1 &&
                            <ListaAnuncios setScreen={setScreen} />
                        }
                        {screen == 2 &&
                            <NovoAnuncio setScreen={setScreen} />
                        }
                        {screen == 3 &&
                            <Propostas setScreen={setScreen} />
                        }

                    </Paper>
                </Grid>

            </Grid>
        </div>
    )
}
