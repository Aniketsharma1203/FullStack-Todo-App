import mongoose from "mongoose";

export const connectToMongoDb = async(url) => {
    return mongoose.connect(url);
}