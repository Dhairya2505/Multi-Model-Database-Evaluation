import { Request, Response } from "express";
import { pg_client } from "../../client/pg-client.js";

export const pg_store_details = async (req: Request, res: Response) => {

    const { student, course } = req.body;

    try {
        const result = await pg_client.query(`insert into relation values ('${student}', '${course}')`)
        
        
        res.status(200).json({
            msg: 'successful'
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Error'
        })
    }

}