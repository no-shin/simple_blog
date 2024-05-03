'use client';

import { TextField, Button, Grid, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send'
import Header from "../components/header";
import NextLink from "next/link"
import { use, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase';

export default function registerForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  function register() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert({ user })
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <Header />
      <Grid container direction="column" spacing={3} alignItems="center">
        <Grid item><TextField onChange={e => setEmail(e.target.value)} id="mailadress" label="email" variant="standard" /></Grid>
        <Grid item><TextField onChange={e => setPassword(e.target.value)} id="password" label="Password" variant="standard" type="password" /></Grid>
        <Grid item><Button onClick={() => { register() }} variant="contained" endIcon={<SendIcon />}>
          Register
        </Button></Grid>
      </Grid>
      <Typography variant="h6" mt={5} align="center">登録済みの場合は<NextLink href="../login">こちら</NextLink>からログインしてください</Typography>
    </div>
  );
}

