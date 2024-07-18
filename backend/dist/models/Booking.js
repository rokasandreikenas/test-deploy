"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    businessId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true, // Custom error message for required field
    },
    date: {
        type: Date,
        required: [true, "field is required. e.g. 2022-04-28"], // Ensuring date is provided
    },
    time: {
        type: String,
        required: [true, "field is required. e.g. 14:00"], // Time must be provided
    },
    userEmail: {
        type: String,
        required: [true, "field is required."], // Email is necessary for contact
        validate: {
            validator: function (email) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: (props) => `${props.value} is not a valid email!`, // Custom message for invalid email
        },
    },
    userName: {
        type: String,
        required: true, // Name is necessary
    },
    status: {
        type: String,
        required: [true, "Booking status is required."], // Status must be provided
        enum: {
            values: ["confirmed", "pending", "cancelled"],
            message: "{VALUE} is not supported", // Custom message if an unsupported value is provided
        },
    },
});
const Booking = mongoose_1.default.model("Booking", bookingSchema);
exports.default = Booking;
