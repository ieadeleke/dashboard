import {
  ControllableSnackBar,
  ControllableSnackBarRef,
  ControllableSnackBarStateParams,
} from "@/components/snackbar/ControllableSnackbar";
import LinearProgress from "@mui/material/LinearProgress";
import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { useEffect, useRef, useState } from "react";
import Router, { useRouter } from "next/router";
import { GlobalActionContext } from "@/context/GlobalActionContext";
import { theme } from "@/utils/theme";
import SEO from "@/components/SEO";

export default function App({ Component, pageProps }: AppProps) {
  const snackBarRef = useRef<ControllableSnackBarRef>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function showSnackBar(params: ControllableSnackBarStateParams) {
    snackBarRef.current?.open(params);
  }

  useEffect(() => {
    Router.events.on("routeChangeStart", () => setIsLoading(true));
    Router.events.on("routeChangeComplete", () => setIsLoading(false));
    Router.events.on("routeChangeError", () => setIsLoading(false));
    return () => {
      Router.events.off("routeChangeStart", () => setIsLoading(true));
      Router.events.off("routeChangeComplete", () => setIsLoading(false));
      Router.events.off("routeChangeError", () => setIsLoading(false));
    };
  }, [Router.events]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalActionContext.Provider value={{ showSnackBar }}>
        <>
          <LinearProgress
            color="primary"
            sx={{
              width: "100%",
              display: isLoading ? "inherit" : "none",
              zIndex: 2000,
              position: "fixed !important",
            }}
          />
          <SEO title="Eko Mile" />
          <Component {...pageProps} />
          <ControllableSnackBar ref={snackBarRef} />
        </>
      </GlobalActionContext.Provider>
    </ThemeProvider>
  );
}
