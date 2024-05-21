import { Response } from "express";
import { CustomError } from "../../../application/errors";



export const handlerError = async (res: Response, error: CustomError) => {
    res.status(error.statusCode || 500).json({
        success: false,
        errors: [error.message]
    })
}