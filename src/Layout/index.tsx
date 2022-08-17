import React, { PropsWithChildren } from 'react'

import Header from './Header'

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main style={{ margin: 16 }}>{children}</main>
    </>
  )
}

export default Layout
