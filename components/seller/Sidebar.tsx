"use client"

import React from 'react'
import { assets } from '@/assets/assets'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const Sidebar = () => {

 const pathname = usePathname()
 const menuItems = [
        { name: 'Add Product', path: '/seller', icon: assets.add_icon },
        { name: 'Product List', path: '/seller/product-list', icon: assets.product_list_icon },
        { name: 'Orders', path: '/seller/orders', icon: assets.order_icon },
    ];

  return (
    <div>
        {menuItems.map((item)=>{
            const isActive = pathname ===item.path;
            return(
                <Link href={item.path} key={item.name} passHref>
                    <div className={`flex items-center py-3 px-4 gap-3 ${isActive ? "border-r-4 md:border-r-[6px] bg-orange-600/10 border-orange-500/90" : "hover:bg-gray-100/90 border-white"}`}>
                        <Image 
                         src={item.icon}
                         alt={`${item.name.toLowerCase()}_icon`}
                         className='w-7 h-7'
                         />
                         <p className='md:block hidden text-center'>{item.name}</p>
                    </div>                 
                </Link>
            )
        })}
    </div>
  )
}

export default Sidebar