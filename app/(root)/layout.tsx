import NavBar from '@/components/Navbar'
import React, { ReactElement } from 'react'

const layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
}

export default layout
