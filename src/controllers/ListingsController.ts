import { Request, Response } from 'express';
import twilio from 'twilio';
import { errorMessage } from '../utils/responses';
import ListingsService from '../services/ListingsService';

class ListingsController {
    private errorMessage: string;
    private listingsService: ListingsService;
    private twilioClient;

    constructor(listingService: ListingsService) {
        this.listingsService = listingService;

        this.errorMessage = errorMessage;
      
        this.twilioClient = twilio(process.env.TWILIO_ACCOUNT_ID, process.env.TWILIO_AUTH_TOKEN);
    }

   

    async readRequest(req: Request, res: Response): Promise<any> {
        try {
            const listings = await this.listingsService.read();
            return res.status(200).json({"data": listings})
        } catch (error) {
            console.log(error);
            return res.status(500).json({"message": this.errorMessage});
        }
    }

    async rescourceRequest(req: Request, res: Response): Promise<any> {
        try {
            const listingId  = Number(req.params.id);

            if(isNaN(listingId)) {
                return res.status(400).json({"message": "invalid id."})
            }

            const resource = await this.listingsService.resource(listingId)

            if(!resource) {
                return res.status(404).json({"message": "Resource not found"})
            }
            return res.status(200).json({"data": resource});
        } catch (error) {
            console.log(error);
            return res.status(500).json({"message": this.errorMessage});
        }
        
    }

    filterData() {

    }
}

export default ListingsController;