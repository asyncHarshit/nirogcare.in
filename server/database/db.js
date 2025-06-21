import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const response = await mongoose.connect(process.env.MONGO_URI);
        if(response){
            console.log("MongoDB connected Successfully !!");
        }else{
            console.log("Not connected to MongoDB");
            
        }
        
    } catch (error) {
        console.log("Mongo Db connection failed !!",error);
        
        
    }
}
