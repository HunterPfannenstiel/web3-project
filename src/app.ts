import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";

const app = express();
config();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res, next) => {
  return res.status(200).json({ message: "Hello!" });
});

app.use("/auth", authRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Error", error);
  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "An error has occurred" });
});

app.listen(8080);
