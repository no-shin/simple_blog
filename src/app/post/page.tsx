'use client'

import { Button, Grid, TextField, Typography } from "@mui/material";
import Header from "..//components/header";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebase/firebase';
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { postDb } from "../type";
import { useRouter } from "next/navigation";
import NextLink from 'next/link';

function post() {
  const [title, setTitle] = useState("");
  const [introText, setIntroText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [url, setUrl] = useState("");
  const [loginNow, setLoginNow] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginNow(true);
      } else {
        setLoginNow(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  function submit(): void {
    const user = auth.currentUser;
    let userEmail: string = "";
    let userId: string = "";
    if (user !== null) {
      user.providerData.forEach((profile) => {
        if (profile.email === null) userEmail = "";
        else userEmail = profile.email;
      });
      if (user.uid !== null) userId = user.uid;
    }
    const data: postDb = {
      title: title,
      bodyText: bodyText,
      introText: introText,
      url: url,
      publicTime: Timestamp.now(),
      unPublicTime: Timestamp.now(),
      postTime: Timestamp.now(),
      userId: userId,
      userName: userEmail,
    }
    setDoc(doc(db, "posts", url), data);
    router.push("/articles/" + { url });
  }
  return (
    <div>
      <Header />
      {loginNow ? (
        <Grid container direction="column">
          <Grid item><TextField onChange={(e) => { setTitle(e.target.value) }} label="title" sx={{ width: "60%", mb: 3 }} /></Grid>
          <Grid item><TextField onChange={(e) => { setUrl(e.target.value) }} label="' /articles/'以降のユニークなurl" sx={{ width: "60%", mb: 3 }} /></Grid>
          <Grid item><TextField onChange={(e) => { setIntroText(e.target.value) }} label="紹介文" sx={{ width: "80%", mb: 3 }} /></Grid>
          <Grid item><TextField onChange={(e) => { setBodyText(e.target.value) }} sx={{ width: "80%", mb: 3 }} multiline rows={30} maxRows={200} label="本文" variant="outlined" /></Grid>
          <Grid item><Button onClick={submit} variant="contained">post</Button></Grid>
        </Grid>
      ) : (
        <div>
          <Typography variant="h5" textAlign="center">投稿にはログインが必要です</Typography>
        </div>
      )
      }
    </div >
  );
}

export default post;
