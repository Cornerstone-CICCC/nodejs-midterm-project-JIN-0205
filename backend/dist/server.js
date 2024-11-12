"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_route_1 = __importDefault(require("./routes/user.route"));
const article_route_1 = __importDefault(require("./routes/article.route"));
// Create server
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:4321",
    credentials: true,
}));
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: [
        (_a = process.env.COOKIE_SIGN_KEY) !== null && _a !== void 0 ? _a : "jerogiglu90o23",
        (_b = process.env.COOKIE_ENCRYPT_KEY) !== null && _b !== void 0 ? _b : "ejefoiwlejf09qo",
    ],
    maxAge: 60 * 60 * 1000, // 1 hour
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/users", user_route_1.default);
app.use("/articles", article_route_1.default);
// 404 Fallback
app.use((req, res) => {
    res.status(404).send("Access denied");
});
// Start server
const PORT = Number(process.env.PORT || 3001);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
