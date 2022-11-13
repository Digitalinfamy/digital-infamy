// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "../utils/trpc";
import * as gtag from '../components/ga-tag';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();

  useEffect(() => {
    gtag.pageview(new URL(`${window.location.href}`));
  }, []);
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(new URL(`${window.location.origin}${url}`));
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
