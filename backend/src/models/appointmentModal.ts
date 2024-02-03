import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['user', 'doctor', 'admin']
    },
    changedStatus: {
        type: String,
        enum: ['scheduled', 'canceled', 'completed'],
        required: true
    },
    note: {
        type: String,
        required: true
    }
}, { timestamps: true })

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        inmutable: true,
        ref: 'user'
    },
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        inmutable: true,
        ref: 'person'
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        inmutable: true,
        ref: 'doctor'
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [30, "name must not have more than 30 characters"],
        minlength: [5, "name must have at least 5 charachters"],
    },
    categories: {
        type: Number,
        min: 1,
        max: 40,
        default: 1
    },
    timeline: [eventSchema],
    Status: {
        enum: ['scheduled', 'canceled', 'completed']
    }
}, { timestamps: true })

export default mongoose.model('appointment', appointmentSchema)