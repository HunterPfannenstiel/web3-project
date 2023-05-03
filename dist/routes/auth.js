"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const challenge = "EEE-123";
router.get("/", (req, res, next) => {
    res.status(200).json({ challenge });
});
router.post("/", (req, res, next) => {
    const body = req.body;
});
exports.default = router;
