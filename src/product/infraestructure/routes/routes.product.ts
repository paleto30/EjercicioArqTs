import { Router } from "express";
import { ProductController } from "../controller/product.controller";
import { ProductUseCases } from "../../application/product.useCases";
import { postgresRepository } from "../database/repository/postgres.repository";
import { validateDto, validateParams, validateQuery,  } from "../middlewares/dto/validate.dto";
import { CreateProductDto, findProductByCodeDto, findProductByIdDto } from "../middlewares/dto/product.dtoClass";


const router = Router();


const useCases = new ProductUseCases(postgresRepository);
const controller = new ProductController(useCases);

router.post(
    '/',
    [
        validateDto(CreateProductDto),
    ],
    controller.createNewProduct.bind(controller)
);


router.get(
    '/:id',
    [
        validateParams(findProductByIdDto)
    ],
    controller.findProductById.bind(controller)
)


router.get(
    '/',
    [
        validateQuery(findProductByCodeDto)
    ],
    controller.findProductByCode.bind(controller)
)


router.put(
    '/:id',
    [
        validateParams(findProductByIdDto),
        validateDto(CreateProductDto)
    ],
    controller.updateProduct.bind(controller)
)


export default router;