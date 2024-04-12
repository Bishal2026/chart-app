import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.db.js";

dotenv.config({
  path: "./src/.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log(`server is running PORT : ${process.env.PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
