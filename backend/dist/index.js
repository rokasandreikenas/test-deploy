"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const businessRoutes_1 = __importDefault(require("./routes/businessRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const db_1 = require("./db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/auth", authRoutes_1.default);
app.use("/categories", categoryRoutes_1.default);
app.use("/businesses", businessRoutes_1.default);
app.use("/bookings", bookingRoutes_1.default);
(0, db_1.connectToDb)()
    .then(() => {
    app.listen(db_1.PORT, () => console.log(`Server running on port ${db_1.PORT}`));
})
    .catch((err) => {
    console.error("Failed to connect to the database", err);
});
