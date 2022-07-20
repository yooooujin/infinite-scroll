import React from 'react'

import Header from './Header'

interface IProps {
  children?: JSX.Element | JSX.Element[] | string
}

function Layout({ children }: IProps) {
  return (
    <>
      <Header />
      <main style={{ margin: 16 }}>{children}</main>
    </>
  )
}

export default Layout
