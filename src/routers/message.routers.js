import { Router } from "express";
import { getMessage, sendMessage } from "../controllers/message.controllers.js";
import isLoggedIn from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/send/:id").post(isLoggedIn, sendMessage);
router.route("/:id").get(isLoggedIn, getMessage);
export default router;
