import { ControllableSnackBar, ControllableSnackBarRef, ControllableSnackBarStateParams } from '@/components/snackbar/ControllableSnackbar'
import { GlobalActionContext } from '@/context/GlobalActionContext'
import UserContext from '@/context/UserContext'
import { User } from '@/models/users'
import storeFactory from '@/redux/store'
import '@/styles/globals.css'
import { theme } from '@/utils/theme'
import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { useEffect, useRef, useState } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  const { store } = storeFactory()
  const snackBarRef = useRef<ControllableSnackBarRef>(null)
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

  return <ThemeProvider theme={theme}>
    <UserContext.Provider value={{ user, updateUser, isAuthenticated: false }}>
      <GlobalActionContext.Provider value={{ showSnackBar }}>
        <ReduxProvider store={store}>
          <>
            <Component {...pageProps} />
            <ControllableSnackBar ref={snackBarRef} />
          </>
        </ReduxProvider>
      </GlobalActionContext.Provider>
    </UserContext.Provider>
  </ThemeProvider>
}
