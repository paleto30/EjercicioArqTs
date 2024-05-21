import { Product } from "./product.model";



interface CreatePoductI {
    create(product: Product): Promise<Product>;
}

interface FindProductI {
    findById(id: number): Promise<Product | null>
    findByCode(code: string): Promise<Product | null>
}


export interface ProductRepository extends CreatePoductI, FindProductI {

}