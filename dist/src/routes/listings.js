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
exports.initializeListingsRouter = void 0;
const express_1 = __importDefault(require("express"));
const ListingsController_1 = __importDefault(require("../controllers/ListingsController"));
const Database_1 = __importDefault(require("../config/Database"));
const ListingsService_1 = __importDefault(require("../services/ListingsService"));
const initializeListingsRouter = (customController) => __awaiter(void 0, void 0, void 0, function* () {
    const router = express_1.default.Router();
    const controller = customController !== null && customController !== void 0 ? customController : yield createDefaultController();
    router.get("/read", controller.readRequest.bind(controller));
    router.get("/resource/:id", controller.rescourceRequest.bind(controller));
    console.log("Listings router initialized.");
    return router;
});
exports.initializeListingsRouter = initializeListingsRouter;
function createDefaultController() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield Database_1.default.getPool();
        const controller = new ListingsController_1.default(new ListingsService_1.default(pool));
        return controller;
    });
}
