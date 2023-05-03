import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { createError } from "../utils/general";
import { verifySig } from "../utils/verify";

export const getChallenge: RequestHandler = async (req, res, next) => {
  const id = v4();
  const challenge = `Sign into 'Lets Build Arbitrum'! One time use code: ${id}`;
  const token = jwt.sign({ challenge }, process.env.JWT_SECRET!, {
    expiresIn: 120,
  });
  res.cookie("challenge", token, {
    expires: new Date(Date.now() + 120 * 1000),
    maxAge: 120 * 1000,
  });
  return res.status(200).json({ message: "challenge set", challenge });
};

interface ChallengeBody {
  address: string | undefined;
  signature: string | undefined;
}

export const postChallenge: RequestHandler = (req, res, next) => {
  const body = req.body as ChallengeBody;
  const token = req.cookies["challenge"];
  if (!token) {
    createError("Please create a challenge or allow cookies", 400, next);
  }
  if (!body.address || !body.signature) {
    createError("Please provide both an address and a signature", 400, next);
  }
  try {
    const challenge = jwt.verify(token, process.env.JWT_SECRET!) as {
      challenge: string;
    };
    const address = verifySig(
      challenge.challenge,
      body.address!,
      body.signature!
    );
    if (!address) {
      createError("Signature does not belong to given address!", 400, next);
    }
    res.status(200).json({ message: "Success!", address });
  } catch (error: any) {
    createError(error.message || "Error verifying cookie", 500, next);
  }
};
