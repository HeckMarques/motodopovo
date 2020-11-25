import React from "react";
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#3f51b5',
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%'
  }
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <p style={{ color: "white" }}>Dev: Mauricio Heck Marques - mauricio.marques888@gmail.com</p>
      <a href="https://github.com/HeckMarques" style={{ color: "white" }}>https://github.com/HeckMarques</a>
    </div>
  );
}

export default Footer;