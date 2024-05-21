import { Product } from "../domain/product.model";
import { ProductRepository } from "../domain/product.repository";
import { CustomError } from "./errors";



/* casos de uso para producto */
export class ProductUseCases {

    private readonly productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    // crear nuevo producto
    async createProduct(product: Product): Promise<Product> {
        try {
            const producto = await this.productRepository.findByCode(product.getCode());
            if (producto) {
                throw new CustomError(`Ya existe un producto con el codigo: '${product.getCode()}'`, 409);
            }
            return await this.productRepository.create(product);
        } catch (error) {
            throw error;
        }
    }


    async findById(id: number): Promise<Product | null> {
        try {
            const product = await this.productRepository.findById(id);
            if (!product) {
                throw new CustomError(`producto con id ${id} no encontrado.`, 404);
            }
            return product;
        } catch (error) {
            throw error;
        }
    }


    async findByCode(code: string): Promise<Product | null> {
        try {
            const product = await this.productRepository.findByCode(code);
            if (!product) {
                throw new CustomError(`producto con id ${code} no encontrado.`, 404);
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

}   