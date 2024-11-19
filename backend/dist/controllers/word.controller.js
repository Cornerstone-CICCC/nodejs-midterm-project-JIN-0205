"use strict";
// controllers/word.controller.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const word_model_1 = __importDefault(require("../models/word.model"));
// Get all words
const getWords = (req, res) => {
    const { userId } = req.session;
    const words = word_model_1.default.findAll(userId);
    res.json(words);
};
// Get word by id
const getWordById = (req, res) => {
    const { id } = req.params;
    const word = word_model_1.default.findById(id);
    if (!word) {
        res.status(404).json({ message: "Word not found" });
        return;
    }
    res.json(word);
};
// Add word
const addWord = (req, res) => {
    const { userId } = req.session;
    const { origin, translated, checked, listState } = req.body;
    if (!origin || !userId || !listState) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    const word = word_model_1.default.create({
        origin,
        translated,
        checked,
        listState,
        userId,
    });
    res.status(201).json(word);
};
// Update word by id
const updateWordById = (req, res) => {
    const { userId } = req.session;
    const { id } = req.params;
    const newData = { userId };
    // req.body に存在するプロパティのみを追加
    if (req.body.origin !== undefined)
        newData.origin = req.body.origin;
    if (req.body.translated !== undefined)
        newData.translated = req.body.translated;
    if (req.body.checked !== undefined)
        newData.checked = req.body.checked;
    if (req.body.listState !== undefined)
        newData.listState = req.body.listState;
    const word = word_model_1.default.edit(id, newData);
    if (!word) {
        res.status(404).json({ message: "Word not found" });
        return;
    }
    res.json(word);
};
// Delete word by id
const deleteWordById = (req, res) => {
    const { userId } = req.session;
    const { id } = req.params;
    const response = word_model_1.default.delete(id, userId);
    if (!response) {
        res.status(404).json({ message: "Word not found" });
        return;
    }
    res.status(204).send();
};
exports.default = {
    getWords,
    getWordById,
    addWord,
    updateWordById,
    deleteWordById,
};
