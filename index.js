import express from "express";
import userRouter from "./src/modules/user/user.routes.js";
import taskRouter from "./src/modules/task/task.routes.js";
import db_connection from "./DB/connection.js";
import { config } from "dotenv";
import { globalResponse } from "./src/middlewares/globalResponse.js";

config({ path: "./config/dev.config.env" });

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/uploads", express.static("uploads")); //static files middleware

app.use("/user", userRouter);
app.use("/task", taskRouter);

app.use(globalResponse);

await db_connection();

app.listen(port, () => {
  console.log(`App running at prot :${port}`);
});
