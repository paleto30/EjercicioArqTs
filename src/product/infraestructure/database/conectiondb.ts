import { DataSource } from 'typeorm';
import { ProductEntity } from './Entities/product.entity';


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "pipe",
    password: "admin",
    database: "typeormdb",
    synchronize: true,
    //logging: true,
    entities: [ProductEntity],
    //subscribers: [],
    //migrations: [],
});