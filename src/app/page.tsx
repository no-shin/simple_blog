'use client'

import { Grid } from "@mui/material";
import BlogCard from "./components/blogCard";
import Header from "./components/header";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from 'firebase/firestore'
import { db } from './firebase/firebase'
import { postDb } from './type'

export default function Home() {
  const [posts, setPosts] = useState<postDb[]>([]);
  useEffect(() => {
    const postData = collection(db, "posts");
    getDocs(postData).then((snapShot) => {
      console.log(snapShot.docs.map((doc) => doc.data()));
      setPosts(snapShot.docs.map((doc) => doc.data() as postDb));
    })
  }, [])
  return (
    <div>
      <Header />
      <Grid container spacing={2}>
        {posts.map((post: postDb) => (
          <BlogCard key={post.url} title={post.title} url={post.url} statement={post.introText} />
        ))}
      </Grid>
    </div>
  );
}
