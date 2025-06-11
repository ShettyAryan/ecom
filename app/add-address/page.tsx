'use client'

import { assets } from '@/assets/assets';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useAppContext } from '@/context/AppContext';
import axios from 'axios';
import Image from 'next/image';
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';


interface Address{
    fullName: string;
    phoneNumber: string;
    pincode: number|string;
    area: string;
    city: string;
    state: string;
  }

const AddAddress = () => {

  const {getToken, router} = useAppContext()
  const [address, setAddress] = useState<Address>({
    fullName: '',
    phoneNumber: '',
    pincode: '',
    area: '',
    city: '',
    state: '',
  })
  
const onSubmitHandler = async (e:FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  try {
    const token = await getToken()

    const {data} = await axios.post('/api/user/address', {address}, {headers:{
      Authorization:`Bearer ${token}`
    }})

    if(data.success){
      toast.success(data.message)
      router.push('/cart')
    }else{
      toast.error(data.message)
    }
  } catch (error:unknown) {
    if(error instanceof Error){
       toast.error(error.message)
    }else{
       toast.error("Something went wrong")
    }
  }


}

  return (
    <>
     <Navbar />
     <div className='px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between'>
      <form action="" className='w-full' onSubmit={onSubmitHandler}>
        <p className='text-2xl md:text-3xl text-gray-500'>
          Add Shipping <span className='font-semibold text-orange-500'>Address</span>
        </p>
        <div className='space-y-3 max-w-sm mt-10'>
          <input type="text" 
          className='px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500'
          placeholder='Full name'
          onChange={(e) => setAddress({...address, fullName:e.target.value})}
          value={address.fullName}/>

          <input type="text" 
          className='px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500'
          placeholder='Phone Number'
          onChange={(e) => setAddress({...address, phoneNumber:e.target.value})}
          value={address.phoneNumber}/>

          <input type="text" 
          className='px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500'
          placeholder='Pincode'
          onChange={(e) => setAddress({...address, pincode:e.target.value})}
          value={address.pincode}/>

          <textarea name="Address"
           className='px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500'
           rows={4}
           placeholder='Address (Area and Street Name)'
           onChange={(e)=>setAddress({...address, area:e.target.value})}
           value={address.area}>
          </textarea>

          <div className='flex space-x-3'>
            <input type="text" 
          className='px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500'
          placeholder='City/District/Town'
          onChange={(e) => setAddress({...address, city:e.target.value})}
          value={address.city}/>

          <input type="text" 
          className='px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500'
          placeholder='State'
          onChange={(e) => setAddress({...address, state:e.target.value})}
          value={address.state}/>

          </div>
        </div>

        <button type='submit' className='max-w-sm w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase'>
          Save Address
        </button>
      </form>

      <Image 
       className='md:mr-16 mt-16 md:mt-0'
       src={assets.my_location_image}
       alt='my_location_image'/>
     </div>    
     <Footer />
    </>
  )
}

export default AddAddress;