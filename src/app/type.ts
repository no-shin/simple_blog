import { Timestamp } from "firebase/firestore";

export type postDb = {
  title: string;
  bodyText: string;
  introText: string;
  url: string;
  publicTime: Timestamp | null;
  unPublicTime: Timestamp | null;
  postTime: Timestamp;
  userId: string;
  userName: string;
}
