import React from 'react'
import { NextPage } from 'next'
import NProgress from 'nprogress'
import { AppProps } from 'next/app'
import Router from 'next/router'

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

import 'nprogress/nprogress.css'
import '../assets/styles.less'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
