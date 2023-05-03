"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res, next) => {
    console.log("Hello from the get request!");
    return res.status(200).json({ message: "EEE" });
});
app.get("/:id", (req, res, next) => {
    const id = req.params.id;
    return res.status(200).json({ id });
});
app.use("/auth", auth_1.default);
app.listen(3000);
