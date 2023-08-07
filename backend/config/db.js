import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connecter = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb host is ${connecter.connection.host}`)
    } catch (err) {
        console.log(err)
    }
}

export { connectDB }