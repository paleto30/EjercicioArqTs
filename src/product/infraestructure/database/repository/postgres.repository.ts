import { ProductRepository } from "../../../domain/product.repository";
import { Product } from "../../../domain/product.model";
import { ProductEntity } from "../Entities/product.entity";
import { Repository } from "typeorm";
import { AppDataSource } from "../conectiondb";
import { CustomError } from "../../../application/errors";




class PostgresRepository implements ProductRepository {

    private readonly repository: Repository<ProductEntity>;

    constructor(repository: Repository<ProductEntity>) {
        this.repository = repository;
    }


    private toDomain(productEntity: ProductEntity): Product {
        return new Product(
            productEntity.code,
            productEntity.name,
            productEntity.price,
            productEntity.stock,
            productEntity.id,
            productEntity.created_at,
            productEntity.updated_at
        );
    }

    private toEntity(product: Product): ProductEntity {
        const entity = new ProductEntity();
        entity.id = product.getId() ?? 0;
        entity.code = product.getCode();
        entity.name = product.getName();
        entity.price = product.getPrice();
        entity.stock = product.getStock();
        entity.created_at = product.getCreatedAt() ?? new Date();;
        entity.updated_at = product.getUpdatedAt() ?? new Date();;
        return entity;
    }

    async create(product: Product): Promise<Product> {
        try {
            const entity = this.toEntity(product);
            const savedEntity = await this.repository.save(entity);
            return this.toDomain(savedEntity);
        } catch (error: Error | any) {

            if (error?.code === '23505') {
                throw new CustomError('El codigo ya esta registrado.', 409);
            }

            throw error;
        }
    }

    async findById(id: number): Promise<Product | null> {
        try {
            const product = await this.repository.findOneBy({
                id: id
            });
            if (!product) {
                throw new CustomError('noexiste', 404);
            }
            return product ? this.toDomain(product) : null;
        } catch (error: Error | any) {
            throw error;
        }
    }


    async findByCode(code: string): Promise<Product | null> {
        try {
            const product = await this.repository.findOneBy({
                code
            });
            return product ? this.toDomain(product) : null;
        } catch (error: Error | any) {
            throw error;
        }
    }


    async updateProduct(id: number, product: Product): Promise<Product> {
        try {
            const updateProduct = await this.repository.update(id, this.toEntity(product));
            if (!updateProduct) {
                throw new CustomError('No se encontro el registro para actualizar.', 404)
            }
            return product;
        } catch (error) {
            throw error;
        }
    }
}



const productRepository = AppDataSource.getRepository(ProductEntity);
export const postgresRepository = new PostgresRepository(productRepository);