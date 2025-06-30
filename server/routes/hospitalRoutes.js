import express from "express"
import { hospitalProfile } from "../controllers/hospital.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/profile",protect,hospitalProfile);


export default router

