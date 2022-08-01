import express from "express";
import bcrypt from "bcrypt";
import { authenticateToken } from "../middleware/authorization.js";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.send({users : users});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await prisma.users.create({
        data: {
            user_name: req.body.name,
            user_email: req.body.email,
            user_password : hashedPassword,
        }
    })

    res.json({ users: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
