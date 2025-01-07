import SignInOptGroup from '@/components/SignInOptGroup'
import SignUpForm from '@/components/SignUpForm'
import Link from 'next/link'
import React from 'react'

const SignInPage = () => {
  return (
    <section>
      <h1 className='font-workSans text-6xl font-bold mt-2 mb-8'>Sign up</h1>
      <p className='mt-4 text-base'>Create your <b>Share<span className='text-blue-500'>it</span></b> account using:</p>


      <SignInOptGroup newUser={true} />

      <div className='divider'></div>

      <SignUpForm />

      <div className='mt-6 text-base p-2'>Already have an account? <Link href={"/sign-in"} className='text-blue-500 underline'>Sign in.</Link></div>
    </section>
  )
}

export default SignInPage
