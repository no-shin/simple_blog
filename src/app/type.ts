import { Timestamp } from "firebase/firestore";

export type postDb = {
  title: string;
  bodyText: string;
  introText: string;
  url: string;
  publicTime: Timestamp;
  unPublicTime: Timestamp;
  postTime: Timestamp;
  userId: string;
  userName: string;
}
