'use client'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { productsDummyData, userDummyData } from '@/assets/assets'
import { useRouter } from 'next/navigation'
import { useAuth, useUser } from '@clerk/nextjs';
import type { UserResource } from "@clerk/types";
import axios from 'axios';
import toast from 'react-hot-toast';



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

type GetToken = (options?: { template?: string }) => Promise<string | null>;


interface AppContextType{
    user : UserResource | null | undefined;
    getToken : GetToken;
    currency: string | undefined;
    router: ReturnType<typeof useRouter>;
    isSeller: boolean;
    setIsSeller: (val:boolean)=>void;
    userData: UserData | boolean;
    fetchUserData: ()=> Promise<void>;
    products: Product[];
    fetchProductData: ()=>Promise<void>;
    cartItems: CartItems;
    setCartItems: (items:CartItems)=>void;
    addToCart: (itemId:string)=>Promise<void>;
    updateCartQuantity: (itemId:string, quantity:number)=>Promise<void>;
    getCartCount: ()=>number;
    getCartAmount: ()=>number | undefined;
    
}

interface AppProviderProps{
    children: ReactNode
}



export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext =(): AppContextType =>{
    const context = useContext(AppContext);
    if(!context){
        throw new Error("useAppcontext must be used within AppContextProvider");
    }
    return context;

}

export const AppContextProvider = ({children}:AppProviderProps)=>{
 const currency = process.env.NEXT_PUBLIC_CURENCY
 const router = useRouter();

 const {user} = useUser();
 const {getToken} = useAuth();

 const [products, setProducts] = useState<Product[]>([])
 const [userData, setUserData] = useState<UserData | boolean>(false)
 const [isSeller, setIsSeller] = useState<boolean>(false)
 const [cartItems, setCartItems] = useState<CartItems>({})

 const fetchProductData = async ()=>{
    try {
    
    const {data} = await axios.get('/api/product/list')

    if(data.success){
        setProducts(data.products)
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
 
 const fetchUserData = async ()=>{
    try {
        if(user?.publicMetadata.role === 'seller'){
    setIsSeller(true)
}
 const token = await getToken()
 const {data} = await axios.get('/api/user/data',{headers:{Authorization:`Bearer ${token}`}})

 if(data.success){
    setUserData(data.user)
    setCartItems(data.user.cartItems)
 }else{
    toast.error(data.message)
 }

    } catch (error:unknown) {
        if (error instanceof Error) {
            toast.error(error.message);
        } else{
            toast.error('Something went wrong');
        }
    }
 }

 const addToCart = async (itemId: string)=>{
    const cartData = structuredClone(cartItems);
    if(cartData[itemId]){
        cartData[itemId]+=1;
    }
    else{
        cartData[itemId] = 1;

    }
    setCartItems(cartData);
    
    if (user) {
        try {
            const token = await getToken()
            await axios.post('/api/cart/update',{cartData}, {headers:{
                Authorization:`Bearer ${token}`
            }})

            toast.success("Item added to cart")
        } catch (error:unknown) {
            if(error instanceof Error){
                toast.error(error.message)
            }else{
                toast.error("Something went wrong")
            }
        }        
    }
 }

 const updateCartQuantity = async (itemId: string, quantity: number)=>{
    const cartData = structuredClone(cartItems);
    if(quantity===0){
        delete cartData[itemId];
    }
    else{
        cartData[itemId] = quantity;
    }
    setCartItems(cartData);

    if (user) {
        try {
            const token = await getToken()
            await axios.post('/api/cart/update',{cartData}, {headers:{
                Authorization:`Bearer ${token}`
            }})

            toast.success("Cart Updated")
        } catch (error:unknown) {
            if(error instanceof Error){
                toast.error(error.message)
            }else{
                toast.error("Something went wrong")
            }
        }        
    }
 }
 const getCartCount = ()=>{
    return Object.values(cartItems).reduce((sum,qty)=>sum+qty,0);
 }
 const getCartAmount = ()=>{
    let totalAmount = 0;
    for (const itemId in cartItems){
        const item = products.find((p)=>p._id === itemId);
        if(item){
            totalAmount+=item.offerPrice * cartItems[itemId];
        }
        
    };
  return Math.floor(totalAmount *100)/100;
    

    
 }
 useEffect(()=>{
        fetchProductData();
    },[]);

    useEffect(()=>{
        if(user){
            fetchUserData();
        }
        
    },[user])

    const value :AppContextType = {
        user,
        getToken,
        currency,
        router,
        isSeller,
        setIsSeller,
        addToCart,
        userData,
        fetchUserData,
        products,
        fetchProductData,
        cartItems,
        getCartAmount,
        getCartCount,
        updateCartQuantity,
        setCartItems

    }
    return(
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>   
    ) 


}