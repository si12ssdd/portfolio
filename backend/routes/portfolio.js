import express from 'express';
import { getPortfolio, updatePortfolio } from '../controllers/portfolioController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// @desc    Get portfolio static/dynamic data
// @route   GET /api/portfolio
// @access  Public
router.get('/', getPortfolio);

// @desc    Update portfolio settings
// @route   PUT /api/portfolio
// @access  Private (Admin)
router.put('/', authMiddleware, updatePortfolio);

export default router;

