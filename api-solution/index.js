import dotenv from "dotenv";
import { app } from "./src/app.js";
import { createMoviesTable } from "./src/db/index.js";

dotenv.config();

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log("App is running on port: ", PORT);
  createMoviesTable();
});
