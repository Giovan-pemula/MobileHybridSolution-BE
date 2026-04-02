import { Request, Response } from 'express';
import { orderService } from '../services/order.service';
import { ok, badRequest, notFound, conflict, internalError } from '../utils/response';
import { createOrderSchema } from '../validations/order.validation';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getOrders(req.user!.id);
    return ok(res, orders, 'Orders fetched successfully');
  } catch (error) {
    console.error(error);
    return internalError(res, 'Failed to fetch orders');
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const parsed = createOrderSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, 'Invalid input', parsed.error.format());
    const order = await orderService.createOrder(req.user!.id, parsed.data.courseIds);
    return ok(res, order, 'Order created successfully', 201);
  } catch (error: any) {
    if (error.message === 'SOME_COURSES_NOT_FOUND') return notFound(res, 'One or more courses not found');
    if (error.message.startsWith('ALREADY_ENROLLED_IN_')) return conflict(res, 'Already enrolled in one of the courses');
    console.error(error);
    return internalError(res, 'Failed to create order');
  }
};
