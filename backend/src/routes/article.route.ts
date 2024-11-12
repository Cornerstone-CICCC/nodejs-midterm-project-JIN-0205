import { Router, Request, Response } from "express";
import articleController from "../controllers/article.controller";
import { checkAuth } from "../middleware/auth";

const articleRouter = Router();

articleRouter.post("/add", checkAuth, articleController.addArticle);
articleRouter.put(
  "/update/:id",
  checkAuth,
  articleController.updateArticleById
);
articleRouter.delete(
  "/delete/:id",
  checkAuth,
  articleController.deleteArticleById
);
articleRouter.get("/:id", checkAuth, articleController.getArticleById);
articleRouter.get("/", checkAuth, articleController.getArticles);

export default articleRouter;
