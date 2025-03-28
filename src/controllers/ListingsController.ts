import { Request, Response } from 'express';
import databaseInstance from '../config/Database';
import twilio from 'twilio';
import { errorMessage } from '../utils/responses';

class ListingsController {
    private errorMessage: string;
    private pool: any;
    private twilioClient;

    constructor() {
        this.errorMessage = errorMessage;
        this.pool = null;
        this.twilioClient = twilio(process.env.TWILIO_ACCOUNT_ID, process.env.TWILIO_AUTH_TOKEN);
    }

    async init(){
        try {
            this.pool = await databaseInstance.getPool();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async readRequest(req: Request, res: Response): Promise<any> {
        try {
            const { client, agent } = req.body;
            const [data] = await this.pool.query('SELECT * FROM propiedad');
            return res.status(200).json({"data": data})
        } catch (error) {
            console.log(error);
            return res.status(500).json({"message": this.errorMessage});
        }
    }

    async CarouselRequest(req: Request, res: Response): Promise<any> {
        try {
            const dataPromise = this.pool.query("SELECT * FROM propiedad");
            const { agent, client, priceLow, priceHigh, propteryType } = req.body;

            await this.twilioClient.messages.create({
                to: client,
                from: agent,
                body: "Perfecto! permíteme un momento mientras busco tus resultados..."
            });

            let priceL =  parseInt(priceLow);
            let priceH =  parseInt(priceHigh);

            let results
            const [data] = await dataPromise;

            results = data.filter((i: any) => {
                return (
                    i.precio >= priceL && i.precio <= priceH
                )
            });


            if(results.length < 3) {
                await this.twilioClient.messages.create({
                    to: `whatsapp:${client}`,
                    from: agent,
                    contentSid: process.env.NO_RESULTS
                });
            } else {

                results = results.slice(0, 3);

                console.log("sending carousel")
                await this.twilioClient.messages.create({
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

                await new Promise((resolve) => setTimeout(resolve, 4000));

                await this.twilioClient.messages.create({
                    to: `whatsapp:${client}`,
                    from: agent,
                    contentSid: process.env.FINAL_MESSAGE
                });
            }
        
            return res.status(200).json({"data": "complete"})
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({"message": this.errorMessage})
        }
    }

    async rescourceRequest(req: Request, res: Response): Promise<any> {
        try {
            const { propertyId } = req.body;

            const [data] = await this.pool.query('SELECT * FROM propiedad WHERE id_propiedad = ?', [propertyId]);
            return res.status(200).json({"data": data});
        } catch (error) {
            console.log(error);
            return res.status(500).json({"message": this.errorMessage});
        }
        
    }

    filterData() {

    }
}

export default ListingsController;