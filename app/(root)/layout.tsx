import NavBar from '@/components/Navbar'
import React, { ReactElement } from 'react'

const layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <NavBar />
      <section className='relative w-full max-w-lg mx-auto'>
        {children}
      </section>
    </>
  )
}

export default layout
