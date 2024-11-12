import { Request, Response } from "express";
import articleModel from "../models/article.model";
import { Article } from "../types/article";

// Get all articles
const getArticles = (req: Request, res: Response): void => {
  const { userId } = req.session;
  const articles = articleModel.findAll(userId);
  res.json(articles);
};

// Get article by id
const getArticleById = (req: Request<{ id: string }>, res: Response): void => {
  const { id } = req.params;
  const article = articleModel.findById(id);
  if (!article) {
    res.status(404).json({ message: "Article not found" });
    return;
  }
  res.json(article);
};

// Add article
const addArticle = (
  req: Request<{}, {}, Omit<Article, "id">>,
  res: Response
): void => {
  const { userId } = req.session;
  const { title, content, published } = req.body;
  if (!title || !userId) {
    res.status(400).json({ message: "Missing title or user id" });
    return;
  }
  const article = articleModel.create({ title, content, published, userId });
  res.status(201).json(article);
};

// Update article by id
const updateArticleById = (
  req: Request<{ id: string }, {}, Partial<Article>>,
  res: Response
): void => {
  const { userId } = req.session;
  const { id } = req.params;
  const { title, content, published } = req.body;
  const article = articleModel.edit(id, { title, content, published, userId });
  if (!article) {
    res.status(404).json({ message: "Article not found" });
    return;
  }
  res.json(article);
};

// Delete article by id
const deleteArticleById = (req: Request<{ id: string }>, res: Response) => {
  const { userId } = req.session;
  const { id } = req.params;
  const response = articleModel.delete(id, userId);
  if (!response) {
    res.status(404).json({ message: "Article not found" });
    return;
  }
  res.status(204).send();
};

export default {
  getArticles,
  getArticleById,
  addArticle,
  updateArticleById,
  deleteArticleById,
};
