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
const Category_1 = __importDefault(require("../models/Category"));
const Business_1 = __importDefault(require("../models/Business"));
const Booking_1 = __importDefault(require("../models/Booking"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const businesses = yield Business_1.default.find();
        res.json(businesses);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching businesses", error: err });
    }
}));
router.post("/", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const business = req.body;
    try {
        const categoryExists = yield Category_1.default.findOne({ name: business.category });
        if (!categoryExists) {
            return res.status(400).json({
                message: "Failed to add business: specified category does not exist.",
            });
        }
        const newBusiness = new Business_1.default(business);
        const savedBusiness = yield newBusiness.save();
        res.status(201).json(savedBusiness);
    }
    catch (err) {
        res.status(500).json({
            message: "Server error while adding business.",
            error: err.message,
        });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const business = yield Business_1.default.findById(req.params.id);
        if (business) {
            res.json(business);
        }
        else {
            res.status(404).send("Business not found");
        }
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching business", error: err });
    }
}));
router.get("/category/:category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filteredBusinesses = yield Business_1.default.find({
            category: req.params.category.toLowerCase(),
        });
        res.json(filteredBusinesses);
    }
    catch (err) {
        res
            .status(500)
            .json({ message: "Error fetching businesses by category", error: err });
    }
}));
router.get("/:id/bookings/date/:date", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slots = yield Booking_1.default.find({
            businessId: req.params.id,
            date: new Date(req.params.date),
        });
        res.json(slots);
    }
    catch (err) {
        res.status(500).json({
            message: "Error fetching bookings for the specified date and business",
            error: err,
        });
    }
}));
exports.default = router;
