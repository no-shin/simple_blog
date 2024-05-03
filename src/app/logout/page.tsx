'use client';

import { TextField, Button, Grid, Typography, useRadioGroup } from "@mui/material";
import SendIcon from '@mui/icons-material/Send'
import Header from "../components/header";
import NextLink from 'next/link';
import { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/navigation";
import { profile } from "console";

function form() {
  const router = useRouter();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("signed in");
    } else {
      console.log("not signed in");
    }
  });
  function logout() {
    signOut(auth)
      .then(() => {
        router.push("/");
      }).catch((error) => {
        console.log(error);
      });
  }
  const user = auth.currentUser;
  let userEmail;
  if (user !== null) {
    user.providerData.forEach((profile) => {
      userEmail = profile.email;
    });
  }
  return (
    <div>
      <Header />
      <Typography align="center" mb={3}>{userEmail}としてログインしています</Typography>
      <Grid container direction="column" spacing={3} alignItems="center">
        <Grid item><Button onClick={logout} variant="contained" endIcon={<SendIcon />}>
          logout
        </Button></Grid>
      </Grid>
    </div>
  );
}

export default form;
