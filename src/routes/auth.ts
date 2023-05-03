import { Router } from "express";
import { getChallenge, postChallenge } from "../controllers/auth";

const router = Router();

router.get("/", getChallenge);

router.post("/", postChallenge);

export default router;
