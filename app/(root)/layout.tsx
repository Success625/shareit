import NavBar from '@/components/Navbar'
import React, { ReactElement } from 'react'

const layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className='relative container mx-auto w-full max-w-lg'>
      <NavBar />
      {children}
    </div>
  )
}

export default layout
