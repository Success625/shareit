import { auth } from '@/auth';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavBar = async () => {
  const session = await auth();

  return (
    <nav>
      <Link href="/">
        <Image src="/logo.svg" alt='logo' width={120} height={30} />
      </Link>

      {/* authenticated user  */}
      <div>
        {session && session?.user ? (
          <>
            <Link href="/post" className='nav_link'>Post</Link>
          </>
        ) : (
          <Link href="/sign-in" className='nav_link'>Sign In</Link>
        )}
      </div>
    </nav>
  )
}

export default NavBar
