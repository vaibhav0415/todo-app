import express from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controller/task.controller.js";
import { authenticate } from "../middleware/authorize.js";

const router = express.Router();

router.post("/create", authenticate, createTask);
router.get("/fetch", authenticate, getTasks);
router.put("/update/:id", authenticate, updateTask);
router.delete("/delete/:id", authenticate, deleteTask);

export default router;