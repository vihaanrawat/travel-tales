import mongoose from 'mongoose';
import dns from "dns"
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])


export async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB connected")
}