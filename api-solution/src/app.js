import express from "express";
import cors from "cors";
import mountRoutes from "./routes/index.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mountRoutes(app);

export { app };
