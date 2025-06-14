import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Address from "@/models/Address";
import Order from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const {userId} = getAuth(request)

        const isSeller = await authSeller(userId)

        if(isSeller === false){
            return NextResponse.json({
                success: false,
                message: 'Not Authorised'
            })
        }
        await connectDB()

        Address.length
        const orders = await Order.find({}).populate('address items.product')

        return NextResponse.json({
            success:true,
            orders
        })
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({
            success:false,
            message: error.message
        })
        }else{
            return NextResponse.json({
            success:false,
            message: 'Gadabad zala baba'
        })
        }
    }
    
}