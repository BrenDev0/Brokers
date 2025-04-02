import express, { Request, Response, NextFunction } from 'express';
import EventsController from '../controllers/EventsController';

const router = express.Router();
const controller = new EventsController();

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

router.post("/collection", controller.collectionRequest.bind(controller));
router.post("/resource", controller.resourceRequest.bind(controller));
router.post("/insert", controller.insertRequest.bind(controller));

router.delete("/delete", controller.deleteRequest.bind(controller));


export default router;
