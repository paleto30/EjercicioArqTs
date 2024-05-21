import express, { Express } from 'express';
import cors from 'cors'
import morgan from 'morgan';
import "reflect-metadata";
import Router from './routes';
import { AppDataSource } from './product/infraestructure/database/conectiondb'





export class CreateApp {

    private app: Express;

    constructor() {
        this.app = express();
        this.middlewares()
        this.initRoutes();
        this.initDb()
    }


    private middlewares(): void {
        this.app.use(cors());
        this.app.use(morgan('dev'))
        this.app.use(express.json());
    }


    private async initDb(): Promise<void> {
        try {
            await AppDataSource.initialize();
            console.log('[ -- DB CONNECTED -- ]');
        } catch (error) {
            console.log(`Error en el metodo initDB: ${error}`);
            process.exit(1);
        }
    }

    private initRoutes(): void {
        this.app.get('/test', (req, res) => {
            res.json({
                test: 'nice test!, server running.'
            });
        });

        this.app.use('/api/v1', Router)
    }


    public listen(Port: number): void {
        this.app.listen(Port, () => {
            console.log(`Running: http://localhost:${Port}/`);
        })
    }

}