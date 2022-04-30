import express from "express";
import {
  renderIndex,
  renderAPIDocumentation,
} from "../controllers/index.controller.js";

const router = express.Router();

router.get("/", renderIndex);
router.get("/docs", renderAPIDocumentation);

export default router;
