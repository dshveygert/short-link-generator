import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ZodError, ZodIssue, ZodSchema } from "zod";

import { ServiceResponse } from "@/common/models/serviceResponse";
import {devError, devLog} from "@/common/utils/devLog";

export const handleServiceResponse = (serviceResponse: ServiceResponse<any>, response: Response) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse);
};

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  devLog("Request body:", req.body);
  devLog("Request params:", req.params);
  devLog("Request query:", req.query);

  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    devError("Request err:", err);
    const errorMessage = `Invalid input: ${(err as ZodError).errors
      .map((e: ZodIssue) => {
        return `"${e.path[1]}" - ${e.message}`;
      })
      .join(", ")}`;
    const statusCode = StatusCodes.BAD_REQUEST;
    const serviceResponse = ServiceResponse.failure(errorMessage, null, statusCode);
    return handleServiceResponse(serviceResponse, res);
  }
};
