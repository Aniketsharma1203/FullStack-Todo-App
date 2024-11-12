import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshTokens: {
        type: String,
    },
    accessTokens: {
        type: String,
    },
    todo: [
        {
            id: String,
            task: String,
            status: String,
        }
    ],
    completedTodo: [
        {
            id: String,
            task: String,
            status: String,
        }
    ]
}, { timestamps: true })

const User = new mongoose.model('user', loginSchema);

export default User;