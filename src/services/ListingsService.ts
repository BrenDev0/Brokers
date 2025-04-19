import mysql, { QueryResult, Pool, ResultSetHeader } from 'mysql2/promise'

class ListingsService {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async read(): Promise<QueryResult> {
        try {
            const [result] = await this.pool.execute(
                "SELECT * FROM propiedad"
            ) 

            return result;
        } catch (error) {
            console.log(error);
            throw new Error("Error getting listings.")
        }
    }

    async resource(listingId: number): Promise<QueryResult | null> {
        try {
          const [result] = await this.pool.execute(
            "SELECT * FROM propiedad WHERE id_propiedad = ?",
            [ listingId ]
          )  

          return result || null;
        } catch (error) {
            console.log(error);
            throw new Error("Error getting resource.")
        }
    }
}

export default ListingsService;