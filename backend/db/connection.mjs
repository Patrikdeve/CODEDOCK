
import mongoose from "mongoose";


export default async function connectMongoDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Mongo DB connected Successfully!")
    }catch(error) {
        console.log("Error while Connecting MongoDB..")
    }
}


