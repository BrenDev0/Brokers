import express from 'express';
import ListingsController from '../controllers/ListingsController';
import databaseInstance from '../config/Database';
import ListingsService from '../services/ListingsService';


export const initializeListingsRouter = async(customController?: ListingsController) => {
    const router = express.Router();
    const controller = customController ?? await createDefaultController();

    router.get("/read", controller.readRequest.bind(controller));
    router.get("/resource/:id", controller.rescourceRequest.bind(controller));

    console.log("Listings router initialized.");
    return router;
}

async function createDefaultController(): Promise<ListingsController> {
    const pool = await databaseInstance.getPool();
    const controller = new ListingsController(
        new ListingsService(pool)
    )

    return controller;
}