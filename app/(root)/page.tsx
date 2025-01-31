import { auth } from '@/auth'
import Hero from '@/components/Hero';
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {
  const session = await auth();
  if (!session) {
    redirect('/sign-in')
  }

  return (
    <>
      <Hero />
      <div className='font-geist text-2xl p-4'>Sign In As: {session.user?.firstname}</div>
    </>
  )
}

export default Page
