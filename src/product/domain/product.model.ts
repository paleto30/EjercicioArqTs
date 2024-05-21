

export class Product {

    private id?: number;
    private code: string;
    private name: string;
    private price: number;
    private stock: number;
    private created_at?: Date;
    private updated_at?: Date

    constructor(code: string, name: string, price: number, stock: number, id?: number, created_at?: Date, updated_at?: Date) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    public getId(): number | undefined {
        return this.id;
    }


    public getCode(): string {
        return this.code;
    }

    public setCode(code: string): void {
        this.code = code;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getStock(): number {
        return this.stock;
    }

    public setStock(stock: number): void {
        this.stock = stock;
    }

    public getCreatedAt(): Date | undefined {
        return this.created_at;
    }

    public setCreatedAt(created_at: Date): void {
        this.created_at = created_at;
    }

    public getUpdatedAt(): Date | undefined {
        return this.updated_at;
    }

    public setUpdatedAt(updated_at: Date): void {
        this.updated_at = updated_at;
    }

}