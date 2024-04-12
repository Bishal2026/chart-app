import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(cookieparser());

app.use(morgan("dev"));
app.use(
  cors({
    origin: [],
    credentials: true,
  })
);

//router

import UserRoueter from "./routers/user.router.js";

app.use("/api/v1/user", UserRoueter);

export default app;
