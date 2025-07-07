import express from 'express';
import { loginUser, registerUser ,selectRole,getMe, logoutUser} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/select-role", protect, selectRole);
router.get("/me", protect, getMe);
router.post("/logout",logoutUser)

export default router;


