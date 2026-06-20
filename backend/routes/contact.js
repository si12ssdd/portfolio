import express from 'express';
import {
  submitContact,
  getContacts,
  markAsRead,
  deleteContact,
} from '../controllers/contactController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitContact);
router.get('/', authMiddleware, getContacts);
router.patch('/:id/read', authMiddleware, markAsRead);
router.delete('/:id', authMiddleware, deleteContact);

export default router;
