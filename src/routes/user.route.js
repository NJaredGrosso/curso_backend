import { Router } from "express";
import * as UserController from "../controllers/user.conroller.js";
import { userAuth } from "../middleware/auth.middleware.js";

const router = new Router();

router.post("/", UserController.createUser);
router.get("/:email", userAuth, UserController.getUser);

export default router;
