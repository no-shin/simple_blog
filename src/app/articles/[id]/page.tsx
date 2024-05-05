'use client'

import Header from "../..//components/header";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import { postDb } from "../../type";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Typography } from "@mui/material";

function article({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [body, setBody] = useState<postDb>();
  const pageId = params.id;
  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", pageId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBody(docSnap.data() as postDb);
      } else {
        router.push("/");
      }
    };
    fetchPost();
  }, [pageId]);

  return (
    <div>
      <Header />
      <Typography variant="h3" gutterBottom>{body?.title}</Typography>
      <Typography sx={{ textAlign: 'right' }} variant="h6" gutterBottom>posted by:{body?.userName}</Typography>
      <Typography variant="h5" gutterBottom>{body?.bodyText}</Typography>
    </div>
  );
}

export default article;
