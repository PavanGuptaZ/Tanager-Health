import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()


const connectDb = async (): Promise<void> => {
    try {
        if (process.env.DATEBASE_URL) {
            await mongoose.connect(process.env.DATEBASE_URL)
        } else {
            throw Error("Database is not Connected")
        }
    } catch (error) {
        throw error
    }
}
export default connectDb