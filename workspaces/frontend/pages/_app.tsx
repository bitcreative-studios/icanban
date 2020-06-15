import React from 'react'
import { NextPage } from 'next'
import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/global.css'

const App: NextPage<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  return <Component {...pageProps} />
}

export default App
