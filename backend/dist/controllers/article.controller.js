"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const article_model_1 = __importDefault(require("../models/article.model"));
// Get all articles
const getArticles = (req, res) => {
    const { userId } = req.session;
    const articles = article_model_1.default.findAll(userId);
    res.json(articles);
};
// Get article by id
const getArticleById = (req, res) => {
    const { id } = req.params;
    const article = article_model_1.default.findById(id);
    if (!article) {
        res.status(404).json({ message: "Article not found" });
        return;
    }
    res.json(article);
};
// Add article
const addArticle = (req, res) => {
    const { userId } = req.session;
    const { title, content, published } = req.body;
    if (!title || !userId) {
        res.status(400).json({ message: "Missing title or user id" });
        return;
    }
    const article = article_model_1.default.create({ title, content, published, userId });
    res.status(201).json(article);
};
// Update article by id
const updateArticleById = (req, res) => {
    const { userId } = req.session;
    const { id } = req.params;
    const { title, content, published } = req.body;
    const article = article_model_1.default.edit(id, { title, content, published, userId });
    if (!article) {
        res.status(404).json({ message: "Article not found" });
        return;
    }
    res.json(article);
};
// Delete article by id
const deleteArticleById = (req, res) => {
    const { userId } = req.session;
    const { id } = req.params;
    const response = article_model_1.default.delete(id, userId);
    if (!response) {
        res.status(404).json({ message: "Article not found" });
        return;
    }
    res.status(204).send();
};
exports.default = {
    getArticles,
    getArticleById,
    addArticle,
    updateArticleById,
    deleteArticleById,
};
