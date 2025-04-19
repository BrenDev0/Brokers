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
const listings_1 = __importDefault(require("./routes/listings"));
const events_1 = require("./routes/events");
const createApp_1 = __importDefault(require("./app/createApp"));
const server = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, createApp_1.default)();
    const [eventsRouter] = yield Promise.all([
        (0, events_1.isinitializeEventsRouter)()
    ]);
    app.use("/listings", listings_1.default);
    app.use("/events", eventsRouter);
    app.listen(3000, () => {
        console.log("Online");
    });
});
server();
