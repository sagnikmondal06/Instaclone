import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Modal from "../components/Modal";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Clipshot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />
      <Menu />
      {/* Feed */}
      <Feed />
      <Modal />
    </div>
  );
}
