import { z } from 'zod';
import {
  createRequest,
  getRequests,
  updateRequestStatus,
  getRequestById,
} from '../services/requestService.js';

const statusEnum = z.enum(['new', 'in_review', 'done', 'archived']);

const createRequestSchema = z.object({
  name: z.string().min(2).max(120),
  company: z.string().min(2).max(160),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  role: z.string().max(80).optional(),
  message: z.string().max(700).optional(),
});

const listSchema = z.object({
  status: statusEnum.optional(),
  search: z.string().max(120).optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
  sort: z.enum(['asc', 'desc']).default('desc'),
});

const updateStatusSchema = z.object({
  status: statusEnum,
});

export function submitRequest(req, res, next) {
  try {
    const data = createRequestSchema.parse(req.body);
    const request = createRequest(data);
    return res.status(201).json(request);
  } catch (error) {
    return next(error);
  }
}

export function listRequests(req, res, next) {
  try {
    const filters = listSchema.parse(req.query);
    const result = getRequests(filters);
    return res.json(result);
  } catch (error) {
    return next(error);
  }
}

export function changeRequestStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = updateStatusSchema.parse(req.body);
    const existing = getRequestById(Number(id));
    if (!existing) {
      return res.status(404).json({ error: 'NotFound', message: 'Request not found' });
    }
    updateRequestStatus(Number(id), status);
    const updated = getRequestById(Number(id));
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
}

export function getRequest(req, res, next) {
  try {
    const { id } = req.params;
    const request = getRequestById(Number(id));
    if (!request) {
      return res.status(404).json({ error: 'NotFound', message: 'Request not found' });
    }
    return res.json(request);
  } catch (error) {
    return next(error);
  }
}
