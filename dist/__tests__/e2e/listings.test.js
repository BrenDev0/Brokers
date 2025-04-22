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
const listings_1 = require("../../src/routes/listings");
describe("Managers Routes", () => {
    let app;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        app = (0, createApp_1.default)();
        const [listingsRouter] = yield Promise.all([
            (0, listings_1.initializeListingsRouter)()
        ]);
        app.use("/listings", listingsRouter);
    }));
    describe("GET /listings/read", () => {
        //  read 
        it("should return status 200", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .get("/listings/read")
                .send();
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("data");
        }));
    });
    describe("GET /lisitngs/resource", () => {
        // resource 
        it("should return status 400 when invalid id passed", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .get("/listings/resource/notAnId")
                .send();
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ "message": "invalid id." });
        }));
        it("should return status 404 when no listing in db", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app)
                .get("/listings/resource/300")
                .send();
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ "message": "Resource not found" });
        }));
    });
});
