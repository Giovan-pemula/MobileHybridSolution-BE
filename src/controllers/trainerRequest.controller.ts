import { Request, Response } from 'express';
import { trainerRequestService } from '../services/trainerRequest.service';
import { ok, badRequest, notFound, conflict, internalError } from '../utils/response';
import { trainerRequestSchema, verifyTrainerSchema } from '../validations/trainerRequest.validation';
import { getParamInt } from '../utils/params';

export const submitTrainerRequest = async (req: Request, res: Response) => {
  try {
    const parsed = trainerRequestSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, 'Invalid input', parsed.error.format());
    const request = await trainerRequestService.submitRequest(req.user!.id, parsed.data);
    return ok(res, request, 'Trainer request submitted', 201);
  } catch (error: any) {
    if (error.message === 'REQUEST_ALREADY_EXISTS') return conflict(res, 'You already have a pending request');
    console.error(error);
    return internalError(res, 'Failed to submit request');
  }
};

export const getTrainerRequests = async (req: Request, res: Response) => {
  try {
    const status = req.query['status'] as string | undefined;
    const requests = await trainerRequestService.getAllRequests(status);
    return ok(res, requests, 'Trainer requests fetched successfully');
  } catch (error) {
    console.error(error);
    return internalError(res, 'Failed to fetch requests');
  }
};

export const verifyTrainer = async (req: Request, res: Response) => {
  try {
    const id = getParamInt(req.params, 'id');
    const parsed = verifyTrainerSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, 'Invalid input', parsed.error.format());
    const result = await trainerRequestService.verifyTrainer(id, parsed.data.status);
    return ok(res, result, `Trainer request ${parsed.data.status.toLowerCase()}`);
  } catch (error: any) {
    if (error.message === 'REQUEST_NOT_FOUND') return notFound(res, 'Request not found');
    if (error.message === 'REQUEST_ALREADY_PROCESSED') return conflict(res, 'Request already processed');
    console.error(error);
    return internalError(res, 'Failed to verify trainer');
  }
};
