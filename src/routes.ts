import { Router } from "express";
import routesProduct from './product/infraestructure/routes/routes.product';

const router = Router();


router.use('/product', routesProduct);


export default router;