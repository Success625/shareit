import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {
  const session = await auth();
  if (!session) {
    redirect('/auth/sign-in')
  }

  return (
    <>
      <div className='font-geist text-2xl p-4'>This is a sample text for font testing.</div>
    </>
  )
}

export default Page
