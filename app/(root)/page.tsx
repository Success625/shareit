import { auth } from '@/auth'
import FeedsSection from '@/components/FeedsSection';
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
      <FeedsSection />
    </>
  )
}

export default Page
