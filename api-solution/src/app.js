import express from "express";
import cors from "cors";
import { router } from "./routes/movies.routes.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router);

export { app };
