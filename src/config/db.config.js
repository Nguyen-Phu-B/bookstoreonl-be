import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database is connected at ${connection.connection.host} `);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
