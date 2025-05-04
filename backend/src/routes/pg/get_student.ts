import { Request, Response } from "express"
import { pg_client } from "../../client/pg-client.js"

export const get_student = async (req: Request, res: Response) => {

    const { student } = req.body;

    const result = await pg_client.query(`select course_id from relation where student_id=$1`, [student]);

    let courses = []
    for (const row of result.rows){
        const result = await pg_client.query(`select name from course where id=$1`, [row.course_id]);
        courses.push(result.rows[0].name);
    }

    res.status(200).json({
        courses
    })



}