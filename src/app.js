import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//router

import UserRoueter from "./routers/user.router.js";
import MessageRouter from "./routers/message.routers.js";

app.use("/api/v1/user", UserRoueter);
app.use("/api/v1/message", MessageRouter);

export default app;
