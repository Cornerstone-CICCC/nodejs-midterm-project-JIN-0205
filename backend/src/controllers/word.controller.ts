// controllers/word.controller.ts

import { Request, Response } from "express";
import wordModel from "../models/word.model";
import { Word } from "../types/word";

// Get all words
const getWords = (req: Request, res: Response): void => {
  const { userId } = req.session;
  const words = wordModel.findAll(userId);
  res.json(words);
};

// Get word by id
const getWordById = (req: Request<{ id: string }>, res: Response): void => {
  const { id } = req.params;
  const word = wordModel.findById(id);
  if (!word) {
    res.status(404).json({ message: "Word not found" });
    return;
  }
  res.json(word);
};

// Add word
const addWord = (
  req: Request<{}, {}, Omit<Word, "id">>,
  res: Response
): void => {
  const { userId } = req.session;
  const { origin, translated, checked, listState } = req.body;
  if (!origin || !userId || !listState) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }
  const word = wordModel.create({
    origin,
    translated,
    checked,
    listState,
    userId,
  });
  res.status(201).json(word);
};

// Update word by id
const updateWordById = (
  req: Request<{ id: string }, {}, Partial<Word>>,
  res: Response
): void => {
  const { userId } = req.session;
  const { id } = req.params;
  const newData: Partial<Word> = { userId };

  // req.body に存在するプロパティのみを追加
  if (req.body.origin !== undefined) newData.origin = req.body.origin;
  if (req.body.translated !== undefined)
    newData.translated = req.body.translated;
  if (req.body.checked !== undefined) newData.checked = req.body.checked;
  if (req.body.listState !== undefined) newData.listState = req.body.listState;

  const word = wordModel.edit(id, newData);
  if (!word) {
    res.status(404).json({ message: "Word not found" });
    return;
  }
  res.json(word);
};

// Delete word by id
const deleteWordById = (req: Request<{ id: string }>, res: Response): void => {
  const { userId } = req.session;
  const { id } = req.params;

  const response = wordModel.delete(id, userId);
  if (!response) {
    res.status(404).json({ message: "Word not found" });
    return;
  }
  res.status(204).send();
};

export default {
  getWords,
  getWordById,
  addWord,
  updateWordById,
  deleteWordById,
};
