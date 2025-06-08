"use client"
import Navbar from '@/components/Navbar'
import React from 'react'

const layout = ({children}:Readonly<{children:React.ReactNode}>) => {
  return (
    <div>
        <Navbar />
        <div className='flex w-full'>

            {children}            
        </div>
    </div>
  )
}

export default layout