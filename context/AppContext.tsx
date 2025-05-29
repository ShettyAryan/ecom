'use client'
import React, { createContext, useContext, useState } from 'react'
import { productsDummyData, userDummyData } from '@/assets/assets'
import { useRouter } from 'next/navigation'


type Product ={
    _id : string;
    name:string;
    offerPrice: number;
    [key:string]:any;
};

type UserData ={
    name:string;
    email:string;
    [key:string]:any;
};

type CartItems ={
    [itemId:string]:number;
}

interface AppContextType{
    currency:string | undefined;
    router:ReturnType<typeof useRouter>;
    isSeller:boolean;
    setIsSeller:(val:boolean)=>void;
    userData:UserData | boolean;
    fetchUser



}



export const AppContext = createContext();

export const useAppContext =()=>{
    return useContext(AppContext)

}

export const AppContextProvider = (props:any)=>{
 const currency = process.env.NEXT_PUBLIC_CURENCY
 const router = useRouter()

 const [products, setProducts] = useState([])
 const [userData, setUserData] = useState(false)
 const [isSeller, setIsSeller] = useState(true)
 const [cartItems, setCartItems] = useState({})

 const fetchProductData = async ()=>{
    setProducts(productsDummyData)
 }
 
 const fetchUserData = async ()=>{
    setProducts(userDummyData)
 }


}