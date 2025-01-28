import { auth } from '@/auth'
import SignInOptGroup from '@/components/SignInOptGroup'
import SignUpForm from '@/components/SignUpForm'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const SignInPage = async () => {
  const session = await auth();
  if (session) {
    redirect('/')
  }

  return (
    <section>
      <h1 className="header-text_gradient">Sign Up</h1>

      <div className="relative opacity-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-t w-4/5 border-gray-700"></div>
        </div>
        <div className="relative flex items-center justify-center">
          <span className="bg-white p-2 text-base">Sign up with:</span>
        </div>
      </div>

      <SignInOptGroup newUser={true} />

      <div className="relative opacity-50">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-t w-4/5 border-gray-700"></div>
        </div>
        <div className="relative flex items-center justify-center">
          <span className="bg-white p-2 text-base">Or continue with email</span>
        </div>
      </div>

      <SignUpForm />

      <div className='mt-6 text-base p-2'>Already have an account? <Link href={"/sign-in"} className='text-blue-500 underline'>Sign in.</Link></div>
    </section>
  )
}

export default SignInPage
