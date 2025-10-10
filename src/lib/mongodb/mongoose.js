import mongoose from 'mongoose'

let initialized = false;

export const connect = async ()=>{
    mongoose.set('strictQuery', true);
    if(initialized){
        console.log("MongoDB is already initialized");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI , {
            dbName:'nextjs13',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
        initialized = true;
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
}