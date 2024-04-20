"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import bg from "./../../../public/kids-bg-tile.png";

const MainButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(orange[500]),
  "&:hover": {
    background: orange[700],
  },
  width: "50%",
  background: "linear-gradient(0deg, #ffe082, #e65100)",
  padding: "20px 16px",
  borderRadius: "30px",
}));

export default function Home() {
  useEffect(() => {
    fetch("http://localhost:4242/api/products", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setBooks(res);
        setFiltered(res);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const clickHandler = (e) => {
    const aux = books.filter((book) => {
      return book.nome.toLowerCase().includes(search.toLowerCase());
    });
    setFiltered([...aux]);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100vh",
        margin: "auto",
        padding: 5,
        alignItems: "center",
        display: "flex",
        backgroundImage: `url(${bg.src})`,
        backgroundRepeat: "repeat",
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{ p: "2px 4px", display: "flex", justifyContent: "center" }}
        >
          <Typography variant="h1" component="h2" sx={{ color: "#a23efc" }}>
            Jogo do Pontinha
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ p: "2px 4px", display: "flex", justifyContent: "center" }}
        >
          <MainButton variant="contained">Jogar</MainButton>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ p: "2px 4px", display: "flex", justifyContent: "center" }}
        >
          <MainButton variant="contained">Sobre Nós</MainButton>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ p: "2px 4px", display: "flex", justifyContent: "center" }}
        >
          <MainButton variant="contained">Créditos</MainButton>
        </Grid>
      </Grid>
    </Box>
  );
}
