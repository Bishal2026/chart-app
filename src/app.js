import express from "express";
import cookieparser from "cookie-parser";
import cors from cors;
import morgan from "morgan"


const app = express();

app.use(express.json())
app.use(cookieparser());

app.use(morgan())
app.use(cors({
    origin:[],
    credentials:true,

}))

export default app;
