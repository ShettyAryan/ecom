import mongoose from "mongoose";

interface MongooseGlobalCache {
    conn: typeof mongoose | null;
    promise : Promise<typeof mongoose> | null;
}

declare global{
    var mongoose : MongooseGlobalCache
}

let cached: MongooseGlobalCache;
 
if(!global.mongoose){
    global.mongoose = {
        conn:null,
        promise: null
    }
}
cached = global.mongoose

async function connectDB (){
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const opts = {
            bufferCommands: false
        }
        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/quickcart`,opts).then((mongoose) =>{
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default connectDB;