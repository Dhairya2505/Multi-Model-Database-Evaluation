import { Request, Response } from "express";
import { pg_client } from "../../client/pg-client.js";

export const get_courses = async (req: Request, res: Response) => {

    try {

        const result = await pg_client.query(`select * from course;`)
        
        res.status(200).json({
            msg: 'successful',
            result: result.rows
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error'
        })
    }

}