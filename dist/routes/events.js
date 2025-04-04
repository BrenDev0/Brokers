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
const express_1 = __importDefault(require("express"));
const EventsController_1 = __importDefault(require("../controllers/EventsController"));
const router = express_1.default.Router();
const controller = new EventsController_1.default();
const initPromise = controller.init();
let isinitialized = false;
router.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!isinitialized) {
        yield initPromise;
        isinitialized = true;
    }
    next();
}));
router.get("/read", controller.readRequest.bind(controller));
router.post("/collection", controller.collectionRequest.bind(controller));
router.post("/resource", controller.resourceRequest.bind(controller));
router.post("/insert", controller.insertRequest.bind(controller));
router.delete("/delete", controller.deleteRequest.bind(controller));
exports.default = router;
