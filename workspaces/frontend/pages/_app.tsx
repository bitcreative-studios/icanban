import React from 'react'
import { NextPage } from 'next'
import NProgress from 'nprogress'
import App, { Container } from 'next/app'
import Router from 'next/router'

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

import 'nprogress/nprogress.css'
import '../assets/styles.less'

class MyApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default MyApp
