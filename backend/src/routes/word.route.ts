// routes/word.route.ts

import { Router } from "express";
import wordController from "../controllers/word.controller";
import { checkAuth } from "../middleware/auth";

const wordRouter = Router();

wordRouter.post("/add", checkAuth, wordController.addWord);
wordRouter.put("/update/:id", checkAuth, wordController.updateWordById);
wordRouter.delete("/delete/:id", checkAuth, wordController.deleteWordById);
wordRouter.get("/:id", checkAuth, wordController.getWordById);
wordRouter.get("/", checkAuth, wordController.getWords);

export default wordRouter;
