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
import UserContext from "@/context/UserContext";
import { Profile } from "@/models/profile";

export default function App({ Component, pageProps }: AppProps) {
  const snackBarRef = useRef<ControllableSnackBarRef>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<Profile | null>(null)
  const router = useRouter();

  function showSnackBar(params: ControllableSnackBarStateParams) {
    snackBarRef.current?.open(params);
  }

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  function updateUser(user: Profile | null) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
    }else setUser(null)
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
        <UserContext.Provider value={{
          user,
          updateUser
        }}>
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
            <SEO title="Pay4It Dashboard" />
            <Component {...pageProps} />
            <ControllableSnackBar ref={snackBarRef} />
          </>
        </UserContext.Provider>
      </GlobalActionContext.Provider>
    </ThemeProvider>
  );
}
