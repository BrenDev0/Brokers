import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import request from 'supertest'
import createApp from '../../src/app/createApp';
import { initializeListingsRouter } from '../../src/routes/listings';


describe("Managers Routes", () => {
    let app: express.Express;

    beforeAll(async () => {
        app = createApp();
        
        const [
            listingsRouter
        ] = await Promise.all([
           initializeListingsRouter()
        ])

        app.use("/listings", listingsRouter);
    })

    describe("GET /listings/read", () => {
        //  read 
        it("should return status 200", async() => {
            const response = await request(app)
            .get("/listings/read")
            .send()

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty("data")
        })
    })

    describe("GET /lisitngs/resource", () => {
        // resource 
        it("should return status 400 when invalid id passed", async() => {
            const response = await request(app)
            .get("/listings/resource/notAnId")
            .send()

            expect(response.status).toBe(400)
            expect(response.body).toEqual({"message": "invalid id."})
        })

        it("should return status 404 when no listing in db", async() => {
            const response = await request(app)
            .get("/listings/resource/300")
            .send()

            expect(response.status).toBe(404)
            expect(response.body).toEqual({"message": "Resource not found"})
        })
    })
})