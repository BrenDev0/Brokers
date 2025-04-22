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
const listings_1 = require("./routes/listings");
const events_1 = require("./routes/events");
const createApp_1 = __importDefault(require("./app/createApp"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger/swagger.json"));
const server = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, createApp_1.default)();
    const [eventsRouter, listingsRouter] = yield Promise.all([
        (0, events_1.initializeEventsRouter)(),
        (0, listings_1.initializeListingsRouter)()
    ]);
    app.use("/listings", listingsRouter);
    app.use("/events", eventsRouter);
    process.env.NODE_ENV !== 'production' && app.use('/docs/endpoints', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    app.use((req, res) => {
        res.status(404).json({ message: "Route not found." });
    });
    app.listen(3000, () => {
        console.log("Online");
    });
});
server();
