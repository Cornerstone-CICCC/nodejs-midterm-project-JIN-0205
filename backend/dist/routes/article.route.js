"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const article_controller_1 = __importDefault(require("../controllers/article.controller"));
const auth_1 = require("../middleware/auth");
const articleRouter = (0, express_1.Router)();
articleRouter.post("/add", auth_1.checkAuth, article_controller_1.default.addArticle);
articleRouter.put("/update/:id", auth_1.checkAuth, article_controller_1.default.updateArticleById);
articleRouter.delete("/delete/:id", auth_1.checkAuth, article_controller_1.default.deleteArticleById);
articleRouter.get("/:id", auth_1.checkAuth, article_controller_1.default.getArticleById);
articleRouter.get("/", auth_1.checkAuth, article_controller_1.default.getArticles);
exports.default = articleRouter;
