import { v4 as uuidv4 } from "uuid";
import { Article } from "../types/article";

class ArticleModel {
  private articles: Article[] = [];

  findAll(userId: string): Article[] {
    const articles = this.articles.filter(
      (article) => article.userId === userId
    );
    return articles;
  }

  findById(id: string): Article | undefined {
    const article = this.articles.find((article) => article.id === id);
    if (!article) return undefined;
    return article;
  }

  create(newData: Omit<Article, "id">): Article {
    const newArticle = {
      id: uuidv4(),
      ...newData,
    };
    this.articles.push(newArticle);
    return newArticle;
  }

  edit(id: string, newData: Partial<Article>): Article | undefined {
    const index = this.articles.findIndex((article) => article.id === id);
    if (index === -1) return undefined;
    if (this.articles[index].userId !== newData.userId) return undefined;
    const updatedArticle = {
      ...this.articles[index],
      ...newData,
    };
    this.articles[index] = updatedArticle;
    return updatedArticle;
  }

  delete(id: string, userId: string): boolean {
    const index = this.articles.findIndex(
      (article) => article.id === id && article.userId === userId
    );
    if (index === 1) return false;
    this.articles.splice(index, 1);
    return true;
  }
}

export default new ArticleModel();
