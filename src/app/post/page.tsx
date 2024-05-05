'use client'

import { Button, Grid, TextField, Typography } from "@mui/material";
import Header from "..//components/header";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebase/firebase';
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { postDb } from "../type";
import { useRouter } from "next/navigation";
import { TimePicker, DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";

function post() {
  const [title, setTitle] = useState("");
  const [introText, setIntroText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [url, setUrl] = useState("");
  const [publicTime, setPublicTime] = useState<Dayjs | null>(null);
  const [unPublicTime, setUnpublicTime] = useState<Dayjs | null>(null);
  const [publicDate, setPublicDate] = useState<Dayjs | null>(null);
  const [unPublicDate, setUnpublicDate] = useState<Dayjs | null>(null);
  const [loginNow, setLoginNow] = useState(false);
  const router = useRouter();
  const today = new Date();
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
    let start: Timestamp | null = null;
    let end: Timestamp | null = null;
    if (user !== null) {
      user.providerData.forEach((profile) => {
        if (profile.email === null) userEmail = "";
        else userEmail = profile.email;
      });
      if (user.uid !== null) userId = user.uid;
    }

    if (publicTime?.unix() !== undefined && publicDate?.unix() !== undefined) {
      const second = publicTime.unix() + publicDate.unix();
      start = Timestamp.fromMillis(second * 1000 - dayjs().valueOf() + dayjs().valueOf() % (60 * 60 * 24 * 1000) + 9 * 60 * 60 * 1000);
    }
    if (unPublicTime?.unix() !== undefined && unPublicDate?.unix() !== undefined) {
      const second = unPublicTime.unix() + unPublicDate.unix();
      end = Timestamp.fromMillis(second * 1000 - dayjs().valueOf() + dayjs().valueOf() % (60 * 60 * 24 * 1000) + 9 * 60 * 60 * 1000);
    }

    const data: postDb = {
      title: title,
      bodyText: bodyText,
      introText: introText,
      url: url,
      publicTime: start,
      unPublicTime: end,
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
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer sx={{ mb: 3 }} components={['DatePicker']}>
                <Grid container direction={"column"}>
                  <Grid item mb={3}>
                    <DatePicker format="YYYY/MM/DD" label="公開日" onChange={(newvalue) => setPublicDate(newvalue)} />
                    <TimePicker ampm={false} label="公開日" onChange={(newvalue) => setPublicTime(newvalue)} />
                  </Grid>
                  <Grid item>
                    <DatePicker format="YYYY/MM/DD" label="非公開日" onChange={(newvalue) => setUnpublicDate(newvalue)} />
                    <TimePicker ampm={false} label="非公開日" onChange={(newvalue) => setUnpublicTime(newvalue)} />
                  </Grid>
                </Grid>
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
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
