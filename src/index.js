import dotenv from "dotenv";
import connectDB from "./db/index.db.js";

import { server } from "./sockets/socket.js";

dotenv.config({
  path: "./src/.env",
});

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 9000, () => {
      console.log(`server is running PORT : ${process.env.PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
