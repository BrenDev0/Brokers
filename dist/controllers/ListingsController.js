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
const Database_1 = __importDefault(require("../config/Database"));
const twilio_1 = __importDefault(require("twilio"));
const responses_1 = require("../utils/responses");
class ListingsController {
    constructor() {
        this.errorMessage = responses_1.errorMessage;
        this.pool = null;
        this.twilioClient = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_ID, process.env.TWILIO_AUTH_TOKEN);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.pool = yield Database_1.default.getPool();
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    readRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { client, agent } = req.body;
                const [data] = yield this.pool.query('SELECT * FROM propiedad');
                return res.status(200).json({ "data": data });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ "message": this.errorMessage });
            }
        });
    }
    CarouselRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataPromise = this.pool.query("SELECT * FROM propiedad");
                const { agent, client, priceLow, priceHigh, propteryType } = req.body;
                yield this.twilioClient.messages.create({
                    to: client,
                    from: agent,
                    body: "Perfecto! permíteme un momento mientras busco tus resultados..."
                });
                let priceL = parseInt(priceLow);
                let priceH = parseInt(priceHigh);
                let results;
                const [data] = yield dataPromise;
                results = data.filter((i) => {
                    return (i.precio >= priceL && i.precio <= priceH);
                });
                if (results.length < 3) {
                    yield this.twilioClient.messages.create({
                        to: `whatsapp:${client}`,
                        from: agent,
                        contentSid: process.env.NO_RESULTS
                    });
                }
                else {
                    results = results.slice(0, 3);
                    console.log("sending carousel");
                    yield this.twilioClient.messages.create({
                        to: `whatsapp:${client}`,
                        from: agent,
                        contentSid: process.env.CAROUSEL,
                        contentVariables: JSON.stringify({
                            1: new Intl.NumberFormat('en-US').format(results[0].precio),
                            2: results[0].id_propiedad.toString(),
                            3: new Intl.NumberFormat('en-US').format(results[1].precio),
                            4: results[1].id_propiedad.toString(),
                            5: new Intl.NumberFormat('en-US').format(results[2].precio),
                            6: results[2].id_propiedad.toString()
                        })
                    });
                    yield new Promise((resolve) => setTimeout(resolve, 4000));
                    yield this.twilioClient.messages.create({
                        to: `whatsapp:${client}`,
                        from: agent,
                        contentSid: process.env.FINAL_MESSAGE
                    });
                }
                return res.status(200).json({ "data": "complete" });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ "message": this.errorMessage });
            }
        });
    }
    rescourceRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { propertyId } = req.body;
                const [data] = yield this.pool.query('SELECT * FROM propiedad WHERE id_propiedad = ?', [propertyId]);
                return res.status(200).json({ "data": data });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ "message": this.errorMessage });
            }
        });
    }
    filterData() {
    }
}
exports.default = ListingsController;
