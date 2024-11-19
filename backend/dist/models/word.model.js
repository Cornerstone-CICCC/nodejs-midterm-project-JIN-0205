"use strict";
// models/word.model.ts
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class WordModel {
    constructor() {
        this.words = [];
    }
    findAll(userId) {
        return this.words.filter((word) => word.userId === userId);
    }
    findById(id) {
        return this.words.find((word) => word.id === id);
    }
    create(newData) {
        const newWord = Object.assign({ id: (0, uuid_1.v4)() }, newData);
        this.words.push(newWord);
        return newWord;
    }
    edit(id, newData) {
        const index = this.words.findIndex((word) => word.id === id);
        if (index === -1)
            return undefined;
        if (this.words[index].userId !== newData.userId)
            return undefined;
        const existingWord = this.words[index];
        const updatedWord = Object.assign({}, existingWord);
        for (const key in newData) {
            if (Object.prototype.hasOwnProperty.call(newData, key)) {
                const value = newData[key];
                if (value !== undefined) {
                    updatedWord[key] = value;
                }
            }
        }
        this.words[index] = updatedWord;
        return updatedWord;
    }
    delete(id, userId) {
        const index = this.words.findIndex((word) => word.id === id && word.userId === userId);
        if (index === -1)
            return false;
        this.words.splice(index, 1);
        return true;
    }
}
exports.default = new WordModel();
