import express from 'express';
import { protect, isAdmin } from '../middlewares/auth.middleware.js';
import { getAdminStats } from '../controllers/admin.controller.js';

const router = express.Router();

// Define admin routes only; implementation lives in controllers
router.get('/stats', protect, isAdmin, getAdminStats);

export default router;
