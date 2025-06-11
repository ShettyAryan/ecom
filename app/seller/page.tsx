"use client"
import { assets } from '@/assets/assets'
import Footer from '@/components/Footer'
import { useAppContext } from '@/context/AppContext'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Addproduct = () => {

  const {getToken} = useAppContext();

 const [files , setFiles] = useState<(File |undefined)[]>([])
 const [name, setName] = useState<string>('')
 const [description, setDescription] = useState<string>('')
 const [category, setCategory] = useState<string>('')
 const [price, setPrice] = useState<string>('Earphone')
 const [offerPrice, setOfferPrice] = useState<string>('')


 const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();

  const formData = new FormData()

  formData.append('name', name)
  formData.append('description', description)
  formData.append('category', category)
  formData.append('price', price)
  formData.append('offerPrice', offerPrice)
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if(file){
      formData.append('images',file)
    }
    
  }

  try {
    const token = await getToken()
    const {data} = await axios.post('/api/product/add', formData,{headers:{Authorization:`Bearer ${token}`}})

    if(data.success){
      toast.success(data.message)
      setFiles([]);
      setName('');
      setCategory('Earphone');
      setDescription('');
      setPrice('');
      setOfferPrice('');
    }else{
      toast.error(data.message)
    }


  } catch (error:unknown) {
    if(error instanceof Error){
      toast.error(error.message)
    } else{
      toast.error("Something went wrong")
    }
  }



 }

  return (
    <div className='flex-1 min-h-screen flex flex-col justify-between'>
      <form onSubmit={handleSubmit} className='md:p-10 p-4 space-y-5 max-w-lg'>
        <div>
          <p className='text-base font-medium'>Product Image</p>
          <div className='flex flex-wrap items-center gap-3 mt-2'>
            {
              [...Array(4)].map((_,index)=>(
                <label key={index} htmlFor={`image${index}`}>
                  <input type="file" id={`image${index}`} hidden 
                   onChange={(e:any)=>{
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                   }} />
                   <Image 
                    src={files[index] ? URL.createObjectURL(files[index]):assets.upload_area}
                    alt=''
                    key={index}
                    className='max w-24 cursor-pointer'
                    width={100}
                    height={100}/>
                </label>
              ))
            }
          </div>
        </div>

        <div className='flex flex-col gap-1 max-w-md'>
          <label htmlFor="product-name" className='text-base font-medium'>
            Product Name
          </label>
          <input type="text" 
           id='product-name'
           placeholder='Type here'
           className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40'
           onChange={(e) => setName(e.target.value)}
           value={name}
           required/>
           
        </div>
        <div className='flex flex-col gap-1 max-w-md'>
          <label htmlFor="product-description" className='text-base font-medium'>
            Product Description
          </label>

          <textarea 
          id="product-description" 
          rows={4} 
          className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none'
          placeholder='Type here'
          onChange={(e)=>setDescription(e.target.value)}
          value={description}
          required
          >

          </textarea>
        </div>
        <div className='flex items-center gap-5 flex-wrap'>
          <div className='flex flex-col gap-1 w-32'>
            <label className='text-base font-medium' htmlFor="category">
              Category
            </label>
            <select id="category"
            className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40'
            onChange={(e)=>setCategory(e.target.value)}
            defaultValue={category}>
              <option value="Earphone">Earphone</option>
              <option value="HeadPhone">HeadPhone</option>
              <option value="Watch">Watch</option>
              <option value="SmartPhone">SmartPhone</option>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div className='flex flex-col gap-1 w-32'>
            <label className='text-base font-medium' htmlFor="product-price">
              Product Price
            </label>
            <input type="number" id='product-price'
             placeholder='0'
             className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40'
             onChange={(e)=>setPrice(e.target.value)}
             value={price}
             required />
          </div>

          <div className='flex flex-col gap-1 w-32'>
            <label className='text-base font-medium' htmlFor="offer-price">
              Offer Price
            </label>
            <input type="number" id='offer-price'
             placeholder='0'
             className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40'
             onChange={(e)=>setOfferPrice(e.target.value)}
             value={offerPrice}
             required />
          </div>
        </div>

        <button type='submit' className='px-8 py-2.5 bg-orange-600 text-whitw font-medium rounded'>
          ADD
        </button>

      </form>
      <Footer />
    </div>
  )
}

export default Addproduct