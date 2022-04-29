import express from "express";
import {
  addMovie,
  getAllCreatedByUser,
} from "../controllers/movies.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.use(verifyToken);

router.post("/movies", addMovie);
router.get("/movies", getAllCreatedByUser);

export { router };
