import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        inmutable: true,
        ref: 'user'
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [30, "name must not have more than 30 characters"],
        minlength: [5, "name must have at least 5 charachters"],
        unique: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    relation: {
        type: String,
        required: true
    },
    profileIcon: {
        type: Number,
        min: 0,
        max: 8,
        default: 0
    },
}, { timestamps: true })

export default mongoose.model('person', personSchema)