import express from "express";
import { addMovie, getAllCreatedByUser } from "../controllers/movies.controller.js";
import { verifyToken, verifyPermission } from "../middleware/movies.js";

const router = express.Router();
router.use(verifyToken);

router.post("/", verifyPermission, addMovie);
router.get("/", getAllCreatedByUser);

export default router;
