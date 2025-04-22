import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import request from 'supertest'
import createApp from '../../src/app/createApp';
import { eventsPool } from '../testpool';
import EventsController from '../../src/controllers/EventsController';
import EventsService from '../../src/services/EventsService';
import { initializeEventsRouter } from '../../src/routes/events';


describe("Managers Routes", () => {
    let app: express.Express;

    beforeAll(async () => {
        app = createApp();
        const pool = eventsPool
        
        const controller = new EventsController(
            new EventsService(pool)
        )

        const [
            eventsRouter
        ] = await Promise.all([
           initializeEventsRouter(controller)
        ])

        app.use("/events", eventsRouter);
    })

    describe('GET /events/read', () => {

        //read
        it('should return status 200 with events', async() => {
            const response = await request(app)
            .get("/events/read")
            .send()

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("data")
        })
    })

    describe("GET /events/collection", () => {

        //collection
        it("should return status 200 with events", async() => {
            const response = await request(app)
            .get("/events/collection/carpincha")
            .send();

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty("data")
        })
    })

    describe("GET /events/resource", () => {

        //resource
        it("should return status 404 when event not found", async() => {
            const response = await request(app)
            .get("/events/resource/16")
            .send()

            expect(response.status).toBe(404)
            expect(response.body).toEqual({"message": "Event not found."})
        })

        //success
        it("should return status 200 with event", async() => {
            const response = await request(app)
            .get("/events/resource/3")
            .send();

            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty("data")
        })
    })

    describe("POST /events/create", () => {

        //insert 
        it("should return status 400 when parameters missing", async() => {
            const response = await request(app)
            .post("/events/create")
            .send({
                eventType: "click",
                eventTarget: "buttton",
                eventDocument: "homepage" 
            })

            expect(response.status).toBe(400)
            expect(response.body).toEqual({ "message": "All fields required."})
        })

        // Success
        it("should return status 201 when event created", async() => {
            const response = await request(app)
            .post("/events/create")
            .send({
                eventType: "click",
                eventTarget: "buttton",
                eventDocument: "homepage",
                agent: "carpincha"
            })

            expect(response.status).toBe(201)
            expect(response.body).toEqual({"message": "Event created."})
        })
    })

    describe("POST /events/delete", () => {

        //delete 
        it("should return status 404 when event not found", async() => {
            const response = await request(app)
            .delete("/events/delete/agent/carpi")
            .send()
            
            expect(response.status).toBe(404)
            expect(response.body).toEqual({ "message": "Event not found." })
        })

        // invalid col
        it("should return status 400 when parameter are invalid", async() => {
            const response = await request(app)
            .delete("/events/delete/page/homepage")
            .send()

            expect(response.status).toBe(400)
            expect(response.body).toEqual({ "message": "Invalid column." })
        })

        // Success
        it("should return status 200 when events deleted", async() => {
            const response = await request(app)
            .delete("/events/delete/document/homepage")
            .send()

            expect(response.status).toBe(200)
            expect(response.body).toEqual({ "message": "events deleted." })
        })
    })
})