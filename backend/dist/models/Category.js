"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: "#000000",
    },
    url: {
        type: String,
        default: "https://img.icons8.com/?size=100&id=6644&format=png&color=000000",
    },
});
const Category = mongoose_1.default.model("Category", categorySchema);
exports.default = Category;
