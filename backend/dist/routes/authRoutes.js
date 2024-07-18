"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const password_1 = require("../utils/password");
const router = express_1.default.Router();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const existingUser = yield User_1.default.findOne({ email: user.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User_1.default(user);
        yield newUser.save();
        return res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        return res.status(500).json({
            message: "Error registering new user.",
            error: err.message,
        });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Please provide email and password" });
        }
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }
        if (!(yield user.isCorrectPassword(password))) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }
        const token = (0, password_1.generateToken)(user._id);
        const userWithoutPassword = yield User_1.default.findById(user._id).select("-password");
        return res
            .status(200)
            .json({ status: "success", token, user: userWithoutPassword });
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: "Error logging in.", error: err.message });
    }
}));
exports.default = router;
