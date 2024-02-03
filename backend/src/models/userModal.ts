import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [30, "name must not have more than 30 characters"],
        minlength: [5, "name must have at least 5 charachters"],
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        min: 6999999999,
        max: 9999999999
    },
    role: {
        type: String,
        default: 'user',
        inmutable: true
    },
    profileIcon: {
        type: Number,
        min: 0,
        max: 6,
        default: 0
    },
    address: {
        type: String,
    }
}, { timestamps: true })

export default mongoose.model('user', userSchema)