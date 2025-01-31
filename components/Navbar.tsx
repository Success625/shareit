import { auth, signOut } from '@/auth';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from './Button';

const NavBar = async () => {
  const session = await auth();

  return (
    <nav>
      <Link href="/">
        <Image src="/logo.svg" alt='logo' width={120} height={30} />
      </Link>

      {/* authenticated user  */}
      <ul className='nav_ul'>
        {session && session?.user ? (
          <>
            <li className='nav_ul_item'>
              <Link href="/post" className='nav_link'>Post</Link>
            </li>

            <li className='nav_ul_item'>
              <form action={async () => {
                "use server"

                await signOut()
              }}>
                <Button type='submit'>Sign Out</Button>
              </form>
            </li>

            <li className='nav_ul_item'>
              <Link href={`/user/${session.user?.id}`} className='nav_link'>{session?.user.firstname ? `${session?.user.firstname} ${session?.user.lastname}` : `${session?.user.name}`}</Link>
            </li>
          </>
        ) : (
          <li className='nav_ul_item'>
            <Link href="/sign-in" className='nav_link'>Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default NavBar
