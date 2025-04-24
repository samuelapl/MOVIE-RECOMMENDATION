import express from 'express';
import router from express.Router();
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { protect, authorize } from '../middlewares/auth';

router.use(protect);

router.get('/', authorize('admin'), getUsers);
router.get('/:id', authorize('admin'), getUser);
router.put('/:id', updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

module.exports = router;