import connectDB from "@/config/db";
import Address from "@/models/Address";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const {userId} = getAuth(request)

        await connectDB()
        Address.length
        Product.length

        const orders= await Order.find({userId}).populate('address items.product')

        return NextResponse.json({
            success:true,
            orders
        })
    } catch (error:unknown) {
        if (error instanceof Error){
           return NextResponse.json({
            success:false,
            message: error.message
        }) 
        }else{
            return NextResponse.json({
            success:false,
            message:"Something wrong happened"
        })
        }
    }
    
}