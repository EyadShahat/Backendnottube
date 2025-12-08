import express from "express";
import { authRequired } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/subscribers/count", authRequired, asyncHandler(async (req, res) => {
  const channel = (req.query.channel || "").trim();
  if (!channel) return res.status(400).json({ error: "channel is required" });

  const count = await User.countDocuments({ subscriptions: channel });
  res.json({ count });
}));

router.get("/:id", authRequired, asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("name avatarUrl bio accountStatus role createdAt updatedAt");
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ user });
}));

export default router;
