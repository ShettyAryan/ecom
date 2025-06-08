"use client"

import Navbar from '@/components/seller/Navbar'
import Sidebar from '@/components/seller/Sidebar'
import React from 'react'

const layout = ({children}:Readonly<{children:React.ReactNode}>) => {
  return (
    <div>
        <Navbar />
        <div className='flex w-full'>
            <Sidebar />
            {children}            
        </div>
    </div>
  )
}

export default layout