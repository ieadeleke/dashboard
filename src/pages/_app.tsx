import { ControllableSnackBar, ControllableSnackBarRef, ControllableSnackBarStateParams } from '@/components/snackbar/ControllableSnackbar'
import { GlobalActionContext } from '@/context/GlobalActionContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRef } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const snackBarRef = useRef<ControllableSnackBarRef>(null)

  function showSnackBar(params: ControllableSnackBarStateParams) {
    snackBarRef.current?.open(params)
  }

  return <GlobalActionContext.Provider value={{ showSnackBar }}>
    <>
      <Component {...pageProps} />
      <ControllableSnackBar ref={snackBarRef} />
    </>
  </GlobalActionContext.Provider>
}
