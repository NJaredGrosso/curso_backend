import { Router } from "express";
const router = Router();
import * as mockingController from "../controllers/mocking.controller.js";

router.get("/", mockingController.get100Products);

export default router;
