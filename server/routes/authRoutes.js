import express from 'express';
import { loginUser, registerUser ,selectRole} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/select-role", protect, selectRole);

export default router;


