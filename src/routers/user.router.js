import { Router } from "express";
import {
  Login,
  Logout,
  Register,
  getOtheruser,
} from "../controllers/user.controller.js";
import isLoggedIn from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/").get(isLoggedIn, getOtheruser);
export default router;
