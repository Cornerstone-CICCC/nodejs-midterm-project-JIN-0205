"use strict";
// routes/word.route.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const word_controller_1 = __importDefault(require("../controllers/word.controller"));
const auth_1 = require("../middleware/auth");
const wordRouter = (0, express_1.Router)();
wordRouter.post("/add", auth_1.checkAuth, word_controller_1.default.addWord);
wordRouter.put("/update/:id", auth_1.checkAuth, word_controller_1.default.updateWordById);
wordRouter.delete("/delete/:id", auth_1.checkAuth, word_controller_1.default.deleteWordById);
wordRouter.get("/:id", auth_1.checkAuth, word_controller_1.default.getWordById);
wordRouter.get("/", auth_1.checkAuth, word_controller_1.default.getWords);
exports.default = wordRouter;
