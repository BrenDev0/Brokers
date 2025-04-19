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
const twilio_1 = __importDefault(require("twilio"));
const responses_1 = require("../utils/responses");
class ListingsController {
    constructor(listingService) {
        this.listingsService = listingService;
        this.errorMessage = responses_1.errorMessage;
        this.twilioClient = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_ID, process.env.TWILIO_AUTH_TOKEN);
    }
    readRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listings = yield this.listingsService.read();
                return res.status(200).json({ "data": listings });
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
                const listingId = Number(req.params.id);
                if (isNaN(listingId)) {
                    return res.status(400).json({ "message": "invalid id." });
                }
                const resource = yield this.listingsService.resource(listingId);
                if (!resource) {
                    return res.status(404).json({ "message": "Resource not found" });
                }
                return res.status(200).json({ "data": resource });
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
