// models/word.model.ts

import { v4 as uuidv4 } from "uuid";
import { Word } from "../types/word";

class WordModel {
  private words: Word[] = [];

  findAll(userId: string): Word[] {
    return this.words.filter((word) => word.userId === userId);
  }

  findById(id: string): Word | undefined {
    return this.words.find((word) => word.id === id);
  }

  create(newData: Omit<Word, "id">): Word {
    const newWord: Word = {
      id: uuidv4(),
      ...newData,
    };
    this.words.push(newWord);
    return newWord;
  }

  edit(id: string, newData: Partial<Word>): Word | undefined {
    const index = this.words.findIndex((word) => word.id === id);
    if (index === -1) return undefined;
    if (this.words[index].userId !== newData.userId) return undefined;

    const existingWord = this.words[index];
    const updatedWord = { ...existingWord } as any;

    for (const key in newData) {
      if (Object.prototype.hasOwnProperty.call(newData, key)) {
        const value = newData[key as keyof Word];
        if (value !== undefined) {
          updatedWord[key] = value;
        }
      }
    }

    this.words[index] = updatedWord as Word;
    return updatedWord as Word;
  }

  delete(id: string, userId: string): boolean {
    const index = this.words.findIndex(
      (word) => word.id === id && word.userId === userId
    );
    if (index === -1) return false;
    this.words.splice(index, 1);
    return true;
  }
}

export default new WordModel();
