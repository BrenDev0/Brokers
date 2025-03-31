import express, { NextFunction, Request, Response } from 'express';
import ListingsController from '../controllers/ListingsController';

const router = express.Router();
const controller = new ListingsController();

const initPromise = controller.init();
let isinitialized = false;
router.use(async(req: Request, res: Response, next: NextFunction): Promise<any> => {
    if(!isinitialized) {
        await initPromise;
        isinitialized = true;
    }

    next();
})

router.get("/read", controller.readRequest.bind(controller));

router.post("/carousel", controller.CarouselRequest.bind(controller));
router.post("/resource", controller.rescourceRequest.bind(controller));

export default router;