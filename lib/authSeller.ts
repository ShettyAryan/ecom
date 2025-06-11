import { clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const authSeller = async (userId:string|null) => {
    try{
        if(!userId) return false;
        
        const client = await clerkClient()
        const user = await client.users.getUser(userId)
            if(user.publicMetadata.role === 'seller'){
            return true;
        } else{
            return false;
        }
        
        

        

    }
    catch (error:unknown){
        if(error instanceof Error){
            return NextResponse.json({
            success:false,
            message: error.message
        })
        }else{
            return NextResponse.json({
            success:false,
            message: "Something went wrong"
        })
        }
  
    }
 
}

export default authSeller