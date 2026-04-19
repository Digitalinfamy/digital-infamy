import Head from "next/head";
import Image from "next/image";
import React from "react";

function About() {
  return ( <>
    <Head>
      <title>Digital Infamy</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="hero-fullscreen">
      <Image
        src="/Logo_plain_D_Black.svg"
        alt="Digital Infamy"
        width={150}
        height={150}
      />
      <h1>DIGITAL INFAMY</h1>
    </main>
  </> );
}

export default About;