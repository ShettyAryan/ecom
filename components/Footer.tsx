import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer>
      <div className='flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500'>
       <div className='w-4/5'>

       <Image className='w-28 md:w-32' src={assets.logo} alt='logo'/>

       <p className='mt-6 text-sm'>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book.
       </p>
       </div>

       <div className='grid grid-cols-2 mt-5'>

       <div className='w-1/2 flex items-center justify-start md:justify-center'>
        <div>
          <h2 className='font-medium text-gray-900 mb-5'>
            Company
          </h2>
          <ul className='text-sm space-y-2'>
            <li>
              <a href="#" className='underline transition'>Home</a>
            </li>
            <li>
              <a href="#" className='underline transition'>About Us</a>
            </li>
            <li>
              <a href="#" className='underline transition'>Contact Us</a>
            </li>
            <li>
              <a href="#" className='underline transition'>Privacy Policy</a>
            </li>
            
          </ul>
        </div>

       </div>

       <div className='w-1/2 flex items-start justify-start md:justify-center'>
        <div>
          <h2 className='font-medium text-gray-900 mb-5'>
            Get in touch
          </h2>
          <div className='text-sm space-y-2'>
            <p>+91-1234567890</p>
            <p>aryanshetty.dev@gmail.com</p>
          </div>
        </div>

       </div>
       </div>

      </div>
      <p className='py-4 text-center text-xs md:text-sm'>
        Copyright 2025 © Aryan Shetty All Rights Reserved. 
      </p>
    </footer>
  )
}

export default Footer