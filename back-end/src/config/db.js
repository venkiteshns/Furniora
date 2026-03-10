import mongoose from 'mongoose'

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected to : ",mongoose.connection.name);
    } catch (err) {
        console.log("Database connection error : ",err);
        process.exit(1)
    }
}

export default dbConnect;