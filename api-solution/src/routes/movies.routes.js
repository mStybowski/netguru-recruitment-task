import express from "express";
import {
  addMovie,
  getAllCreatedByUser,
} from "../controllers/movies.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { Movie } from "../models/Movie.js";

const router = express.Router();
router.use(verifyToken);

router.post("/", addMovie);
router.get("/", getAllCreatedByUser);

export default router;
