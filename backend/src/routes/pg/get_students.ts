import { Request, Response } from "express";
import { pg_client } from "../../client/pg-client.js";

export const get_students = async (req: Request, res: Response) => {

    try {
        const result = await pg_client.query(`select * from student;`)
        
        res.status(200).json({
            msg: 'successful',
            result: result.rows
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Error'
        })

    }

}