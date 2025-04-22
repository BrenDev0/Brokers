"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const supertest_1 = __importDefault(require("supertest"));
const createApp_1 = __importDefault(require("../../src/app/createApp"));
const testpool_1 = require("../testpool");
const EventsController_1 = __importDefault(require("../../src/controllers/EventsController"));
const EventsService_1 = __importDefault(require("../../src/services/EventsService"));
const events_1 = require("../../src/routes/events");
describe("Managers Routes", () => {
    let app;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        app = (0, createApp_1.default)();
        const pool = testpool_1.eventsPool;
        const controller = new EventsController_1.default(new EventsService_1.default(pool));
        const [eventsRouter] = yield Promise.all([
            (0, events_1.initializeEventsRouter)(controller)
        ]);
        app.use("/events", eventsRouter);
    }));
    describe('GET /events/read', () => {
        //read
        it('should return status 200 with events', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .get("/events/read")
                .send();
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("data");
        }));
    });
    describe("GET /events/collection", () => {
        //collection
        it("should return status 200 with events", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .get("/events/collection/carpincha")
                .send();
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("data");
        }));
    });
    describe("GET /events/resource", () => {
        //resource
        it("should return status 404 when event not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .get("/events/resource/16")
                .send();
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ "message": "Event not found." });
        }));
        //success
        it("should return status 200 with event", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .get("/events/resource/3")
                .send();
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("data");
        }));
    });
    describe("POST /events/create", () => {
        //insert 
        it("should return status 400 when parameters missing", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .post("/events/create")
                .send({
                eventType: "click",
                eventTarget: "buttton",
                eventDocument: "homepage"
            });
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ "message": "All fields required." });
        }));
        // Success
        it("should return status 201 when event created", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .post("/events/create")
                .send({
                eventType: "click",
                eventTarget: "buttton",
                eventDocument: "homepage",
                agent: "carpincha"
            });
            expect(response.status).toBe(201);
            expect(response.body).toEqual({ "message": "Event created." });
        }));
    });
    describe("POST /events/delete", () => {
        //delete 
        it("should return status 404 when event not found", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .delete("/events/delete/agent/carpi")
                .send();
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ "message": "Event not found." });
        }));
        // invalid col
        it("should return status 400 when parameter are invalid", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .delete("/events/delete/page/homepage")
                .send();
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ "message": "Invalid column." });
        }));
        // Success
        it("should return status 200 when events deleted", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .delete("/events/delete/document/homepage")
                .send();
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ "message": "events deleted." });
        }));
    });
});
