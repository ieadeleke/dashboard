import { ControllableSnackBar, ControllableSnackBarRef, ControllableSnackBarStateParams } from '@/components/snackbar/ControllableSnackbar'
import { GlobalActionContext } from '@/context/GlobalActionContext'
import storeFactory from '@/redux/store'
import '@/styles/globals.css'
import { theme } from '@/utils/theme'
import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { useRef } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  const { store } = storeFactory()
  const snackBarRef = useRef<ControllableSnackBarRef>(null)

  function showSnackBar(params: ControllableSnackBarStateParams) {
    snackBarRef.current?.open(params)
  }

  return <ThemeProvider theme={theme}>
    <GlobalActionContext.Provider value={{ showSnackBar }}>
      <ReduxProvider store={store}>
        <>
          <Component {...pageProps} />
          <ControllableSnackBar ref={snackBarRef} />
        </>
      </ReduxProvider>
    </GlobalActionContext.Provider>
  </ThemeProvider>
}
