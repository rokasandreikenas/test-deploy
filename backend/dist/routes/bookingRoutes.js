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
const Booking_1 = __importDefault(require("../models/Booking"));
const router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newBooking = new Booking_1.default(req.body);
        yield newBooking.save();
        res.status(201).json(newBooking);
    }
    catch (err) {
        res.status(400).json({
            message: "Error creating booking",
            error: (_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : err,
        });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield Booking_1.default.find();
        res.json(bookings);
    }
    catch (err) {
        res
            .status(500)
            .json({ message: "Error fetching bookings for the user", error: err });
    }
}));
router.get("/user/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userBookings = yield Booking_1.default.find({ userEmail: req.params.email });
        res.json(userBookings);
    }
    catch (err) {
        res
            .status(500)
            .json({ message: "Error fetching bookings for the user", error: err });
    }
}));
exports.default = router;
