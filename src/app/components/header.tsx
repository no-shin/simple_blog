'use client'
import { Button, Box, AppBar, Toolbar, Link as MuiLink } from "@mui/material";
import NextLink from 'next/link';
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export default function Header() {
  const [loginNow, setLoginNow] = useState(false);

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
  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <AppBar position="static">
        <Toolbar>
          <MuiLink component={NextLink} href="/" underline="none" color="white" variant="h6" sx={{ flexGrow: 1 }}>
            {"Simple Blog"}
          </MuiLink>
          {loginNow ? (
            <Button component={NextLink} color="inherit" href="/logout">Logout</Button>
          ) : (
            <Button component={NextLink} color="inherit" href="/login">Login</Button>
          )}
          {loginNow ? (
            <Button component={NextLink} color="inherit" href="/post">Post</Button>
          ) : (
            <Button component={NextLink} color="inherit" href="/register">Register</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>

  );
}
