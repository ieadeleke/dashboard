import { ControllableSnackBar, ControllableSnackBarRef, ControllableSnackBarStateParams } from '@/components/snackbar/ControllableSnackbar'
import { GlobalActionContext } from '@/context/GlobalActionContext'
import UserContext from '@/context/UserContext'
import { User } from '@/models/users'
import LinearProgress from '@mui/material/LinearProgress';
import storeFactory from '@/redux/store'
import '@/styles/globals.css'
import { theme } from '@/utils/theme'
import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { useEffect, useRef, useState } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import Router from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const { store } = storeFactory()
  const snackBarRef = useRef<ControllableSnackBarRef>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null)

  function showSnackBar(params: ControllableSnackBarStateParams) {
    snackBarRef.current?.open(params)
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  function updateUser(user: User | null) {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }
  
  useEffect(() => {
    Router.events.on('routeChangeStart', () => setIsLoading(true));
    Router.events.on('routeChangeComplete', () => setIsLoading(false));
    Router.events.on('routeChangeError', () => setIsLoading(false));
    return () => {
      Router.events.off('routeChangeStart', () => setIsLoading(true));
      Router.events.off('routeChangeComplete', () => setIsLoading(false));
      Router.events.off('routeChangeError', () => setIsLoading(false));
    };
  }, [Router.events]);


  return <ThemeProvider theme={theme}>
    <UserContext.Provider value={{ user, updateUser, isAuthenticated: false }}>
      <GlobalActionContext.Provider value={{ showSnackBar }}>
        <ReduxProvider store={store}>
          <>
            <LinearProgress color="primary" sx={{ width: '100%', display: isLoading ? 'inherit' : 'none', zIndex: 2000, position: 'fixed !important' }} />
            <Component {...pageProps} />
            <ControllableSnackBar ref={snackBarRef} />
          </>
        </ReduxProvider>
      </GlobalActionContext.Provider>
    </UserContext.Provider>
  </ThemeProvider>
}
