'use client';

import { TextField, Button, Grid, Typography, useRadioGroup } from "@mui/material";
import SendIcon from '@mui/icons-material/Send'
import Header from "../components/header";
import NextLink from 'next/link';
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/navigation";

function form() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      })
  }
  return (
    <div>
      <Header />
      <Grid container direction="column" spacing={3} alignItems="center">
        <Grid item><TextField onChange={(e) => { setEmail(e.target.value) }} id="mailadress" label="email" variant="standard" /></Grid>
        <Grid item><TextField onChange={(e) => { setPassword(e.target.value) }} id="password" label="Password" variant="standard" type="password" /></Grid>
        <Grid item><Button onClick={login} variant="contained" endIcon={<SendIcon />}>
          login
        </Button></Grid>
      </Grid>
      <Typography variant="h6" mt={5} align="center">未登録の場合は<NextLink href="../register">こちら</NextLink>から登録してください</Typography>
    </div>
  );
}

export default form;
