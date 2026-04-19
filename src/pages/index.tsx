import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Digital Infamy</title>
        <meta name="description" content="Digital Infamy - Coming Soon" />
        <meta property="og:url" content="https://digitalinfamy.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://digitalinfamy.com/Digital_Infamy_LOGO.png" />
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
    </>
  );
};

export default Home;