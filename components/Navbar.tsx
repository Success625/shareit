import { auth, signOut } from '@/auth';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from './Button';
import { LuBadgePlus } from "react-icons/lu"
import { IoMdLogOut } from "react-icons/io"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
              <Link href="/post" className='nav_link'>
                <span className='sm:block hidden'>Post</span>
                <span className='sm:hidden block'><LuBadgePlus className='text-xl' /></span>
              </Link>
            </li>

            <li className='nav_ul_item'>
              <form action={async () => {
                "use server"

                await signOut()
              }}>
                <Button type='submit' className='flex items-center'>
                  <span className='sm:block hidden'>Sign Out</span>
                  <span className='sm:hidden block'><IoMdLogOut className='text-xl' /></span>
                </Button>
              </form>
            </li>

            <li className='nav_ul_item'>
              <Link href={`/user/${session.user?.id}`} className='nav_link'>
                <span className='sm:block hidden'>{session?.user.firstname ? `${session?.user.firstname} ${session?.user.lastname}` : `${session?.user.name}`}</span>
                <span className='sm:hidden block'>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </span>
              </Link>
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
