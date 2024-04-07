import express from "express";
import * as v from "valibot";
import { registerUser, loginUser } from "./auth.service.js";
import { changeNameSchema, loginSchema, registerSchema } from "./dto/index.js";
import { authMiddlewareAdmin } from "./middleware/admin.js";
import { authMiddlewareUser } from "./middleware/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const validateRegister = v.parse(registerSchema, req.body);
    const result = await registerUser(req.body);
    res.cookie("refreshToken", result.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(201).send(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const validateLogin = v.parse(loginSchema, req.body);
    const result = await loginUser(req.body);
    res.cookie("refreshToken", result.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

export default router;
