// index.ts

import express, { Request, Response } from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/user.route";
import articleRouter from "./routes/article.route";
import wordRouter from "./routes/word.route";

// サーバーの作成
const app = express();

// ミドルウェアの設定
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  cookieSession({
    name: "session",
    keys: [
      process.env.COOKIE_SIGN_KEY ?? "default_sign_key",
      process.env.COOKIE_ENCRYPT_KEY ?? "default_encrypt_key",
    ],
    maxAge: 60 * 60 * 1000, // 1時間
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ルーティング
app.use("/users", userRouter);
app.use("/articles", articleRouter);
app.use("/words", wordRouter);

// 404 エラーハンドリング
app.use((req: Request, res: Response) => {
  res.status(404).send("Access denied");
});

// サーバーの起動
const PORT: number = Number(process.env.PORT || 3001);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
