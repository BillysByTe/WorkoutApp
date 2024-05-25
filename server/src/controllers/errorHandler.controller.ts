import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError";

const globalErrorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", {
        msg: error.message,
        stack: error.stack,
        status: error.status,
    });
};

export default globalErrorHandler;
