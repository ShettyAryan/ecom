import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 pt-8 pb-14'>
      <h1 className='md:text-4xl text-2xl font-medium'>
        Subscribe now & get 20% off
      </h1>
      <p className='md:text-base text-gray-500/80 pb-8'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti, ab quo 
      </p>
      <div className='flex items-center justify-between max-w-2xl w-full md:h-14 h-12'>
        <input type="text" className='border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500' placeholder='Enter your email id'/>
        <button className='md:px-12 px-8 h-full text-white bg-orange-600 rounded-md rounded-1-none'>
          Subscribe
        </button>

      </div>

    </div>
  )
}

export default Newsletter