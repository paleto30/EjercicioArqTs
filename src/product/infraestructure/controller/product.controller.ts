import { Request, Response } from 'express'
import { ProductUseCases } from "../../application/product.useCases";
import { Product } from '../../domain/product.model';
import { CustomError } from '../../application/errors';
import { handlerError } from '../middlewares/hanlderError/handler.error';





export class ProductController {

    private readonly productUseCases: ProductUseCases;

    constructor(productUseCases: ProductUseCases) {
        this.productUseCases = productUseCases;
    }


    async createNewProduct(req: Request, res: Response) {
        try {
            const { code, name, price, stock } = req.body;
            const response = await this.productUseCases.createProduct(new Product(code, name, price, stock));
            res.status(201).json({
                success: true,
                message: 'Creado correctamente',
                product: response
            });
        } catch (error: CustomError | Error | any) {
            handlerError(res, error);
        }
    }

    async findProductById(req: Request, res: Response) {
        try {
            const id = +req.params.id;
            const response = await this.productUseCases.findById(id);
            res.json({
                success: true,
                message: 'Consultado correctamente.',
                product: response
            })
        } catch (error: CustomError | Error | any) {
            handlerError(res, error);
        }
    }


    async findProductByCode(req: Request, res: Response) {
        try {
            const code = req.query.code as string;
            const response = await this.productUseCases.findByCode(code);
            res.json({
                success: true,
                message: 'Consultado correctamente.',
                product: response
            })
        } catch (error: CustomError | Error | any) {
            handlerError(res, error);
        }
    }


    async updateProduct(req: Request, res: Response) {
        try {

            const { code, name, price, stock } = req.body;
            const { id } = req.params;
            const response = await this.productUseCases.update(+id, new Product(code, name, price, stock, +id))
            res.json({
                success: true,
                message: 'Actualizado correctamente.',
                response
            })

        } catch (error: CustomError | Error | any) {
            handlerError(res, error);
        }
    }

}