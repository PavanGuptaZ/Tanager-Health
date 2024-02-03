import mongoose, { InferSchemaType } from "mongoose";

const doctorSchema = new mongoose.Schema({
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
        default: 'doctor',
        inmutable: true
    },
    status: {
        type: String,
        required: true,
        enum: ['notapproved', 'approved']
    },
    profileIcons: {
        type: Number,
        min: 0,
        max: 6,
        default: 0
    }
}, { timestamps: true })

type doctor = InferSchemaType<typeof doctorSchema>

export default mongoose.model<doctor>('doctor', doctorSchema)