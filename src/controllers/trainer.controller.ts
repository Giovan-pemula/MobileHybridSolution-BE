import { Request, Response } from 'express';
import { trainerService } from '../services/trainer.service';
import { ok, internalError } from '../utils/response';

export const getTrainerDashboard = async (req: Request, res: Response) => {
  try {
    const dashboard = await trainerService.getDashboard(req.user!.id);
    return ok(res, dashboard, 'Dashboard fetched successfully');
  } catch (error) {
    console.error(error);
    return internalError(res, 'Failed to fetch dashboard');
  }
};

export const getTrainerSales = async (req: Request, res: Response) => {
  try {
    const sales = await trainerService.getSales(req.user!.id);
    return ok(res, sales, 'Sales data fetched successfully');
  } catch (error) {
    console.error(error);
    return internalError(res, 'Failed to fetch sales data');
  }
};
