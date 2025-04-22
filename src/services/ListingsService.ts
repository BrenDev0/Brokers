import { QueryResult, Pool } from 'mysql2/promise'
import { Listing, ListingResult } from '../interface/models';

class ListingsService {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async read(): Promise<QueryResult> {
        try {
            const [result] = await this.pool.execute(
                "SELECT * FROM propiedades"
            ) 

            return result;
        } catch (error) {
            console.log(error);
            throw new Error("Error getting listings.")
        }
    }

    async resource(listingId: number): Promise<Listing | null> {
        try {
          const [rows] = await this.pool.execute<ListingResult[]>(
            "SELECT * FROM propiedades WHERE propiedades_id = ?",
            [ listingId ]
          )  

          return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.log(error);
            throw new Error("Error getting resource.")
        }
    }
}

export default ListingsService;