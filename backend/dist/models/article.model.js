"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class ArticleModel {
    constructor() {
        this.articles = [];
    }
    findAll(userId) {
        const articles = this.articles.filter((article) => article.userId === userId);
        return articles;
    }
    findById(id) {
        const article = this.articles.find((article) => article.id === id);
        if (!article)
            return undefined;
        return article;
    }
    create(newData) {
        const newArticle = Object.assign({ id: (0, uuid_1.v4)() }, newData);
        this.articles.push(newArticle);
        return newArticle;
    }
    edit(id, newData) {
        const index = this.articles.findIndex((article) => article.id === id);
        if (index === -1)
            return undefined;
        if (this.articles[index].userId !== newData.userId)
            return undefined;
        const updatedArticle = Object.assign(Object.assign({}, this.articles[index]), newData);
        this.articles[index] = updatedArticle;
        return updatedArticle;
    }
    delete(id, userId) {
        const index = this.articles.findIndex((article) => article.id === id && article.userId === userId);
        if (index === 1)
            return false;
        this.articles.splice(index, 1);
        return true;
    }
}
exports.default = new ArticleModel();
