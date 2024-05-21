import { plainToInstance } from "class-transformer"
import { ValidationError, validate } from "class-validator";
import { NextFunction, Response, Request } from "express"
import { ParamsDictionary } from "express-serve-static-core";



export const validateDto = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        const dtoInstance = plainToInstance(dtoClass, req.body);
        const errors = await validate(dtoInstance);

        const allowedKeys = Object.keys(new dtoClass());
        const unexpectedKeys = Object.keys(req.body).filter(key => !allowedKeys.includes(key));

        const errorMessages: string[] = errors.flatMap((error: ValidationError) =>
            error.constraints ? Object.values(error.constraints) : []
        );

        // Agregar mensajes de error para claves no esperadas
        if (unexpectedKeys.length > 0) {
            errorMessages.push(`Unexpected keys: ${unexpectedKeys.join(', ')}`);
        }

        if (errorMessages.length > 0) {
            res.status(400).json({ success: false, errors: errorMessages });
        } else {
            req.body = dtoInstance;
            next();
        }
    };
};



const handleUnexpectedKeys = (req: ParamsDictionary, allowedKeys: string[]): string[] => {
    const unexpectedKeys = Object.keys(req).filter(key => !allowedKeys.includes(key));
    return unexpectedKeys.length > 0 ? [`Unexpected keys: ${unexpectedKeys.join(', ')}`] : [];
};



export const validateParams = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        const params = plainToInstance(dtoClass, req.params);
        const errors: ValidationError[] = await validate(params as object);

        const allowedKeys = Object.keys(new dtoClass());
        const errorMessages: string[] = errors.flatMap((error: ValidationError) =>
            error.constraints ? Object.values(error.constraints) : []
        );

        const unexpectedKeysError = handleUnexpectedKeys(req.params, allowedKeys);

        if (errorMessages.length > 0 || unexpectedKeysError.length > 0) {
            res.status(400).send({ success: false, errors: [...errorMessages, ...unexpectedKeysError] });
        } else {
            req.params = params as unknown as ParamsDictionary;
            next();
        }
    };
};


export const validateQuery = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        const query = plainToInstance(dtoClass, req.query);
        const errors: ValidationError[] = await validate(query as object);

        const allowedKeys = Object.keys(new dtoClass());
        const errorMessages: string[] = errors.flatMap((error: ValidationError) =>
            error.constraints ? Object.values(error.constraints) : []
        );

        const unexpectedKeysError = handleUnexpectedKeys(req.query as ParamsDictionary, allowedKeys);

        if (errorMessages.length > 0 || unexpectedKeysError.length > 0) {
            res.status(400).send({ success: false, errors: [...errorMessages, ...unexpectedKeysError] });
        } else {
            req.query = query as unknown as ParamsDictionary;
            next();
        }
    };
};