import Header from "./components/header";
import NextLink from 'next/link';

export default function Home() {
  return (
    <div>
      <Header />
      <p>ここはトップページ</p>
      <NextLink href="/article/abcd">記事</NextLink>
    </div>
  );
}
