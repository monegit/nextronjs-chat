import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Login from "./login";

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <div>
        <Login />
      </div>
    </React.Fragment>
  );
}

export default Home;
