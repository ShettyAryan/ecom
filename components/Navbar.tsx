'use client'
import Image from 'next/image'
import React from 'react'
import {assets} from '@/assets/assets'
import { Router } from 'next/router'


const Navbar = () => {
  return (
    <nav className='flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700'>
      <Image 
        className='cursor-pointer w-28 md:32' 
        src={assets.logo}
        alt='logo'
        onClick={()=>Router.push("/")}/>

    </nav>
  )
}

export default Navbar