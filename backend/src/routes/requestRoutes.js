import { Router } from 'express';
import {
  submitRequest,
  listRequests,
  changeRequestStatus,
  getRequest,
} from '../controllers/requestController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', submitRequest);

router.use(authMiddleware);
router.get('/', listRequests);
router.get('/:id', getRequest);
router.patch('/:id/status', changeRequestStatus);

export default router;
