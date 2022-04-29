import { app } from "./src/app.js";

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log("App is running on port: ", PORT);
});
