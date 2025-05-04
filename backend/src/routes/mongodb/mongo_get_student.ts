import { Request, Response } from "express"
import { Course, Student } from "../../models/models.js";

export const mongo_get_student = async (req: Request, res: Response) => {

    const { student } = req.body;

    const result = await Student.find({ id: student });

    let courses = []
    for (const id of result[0].courses){
        const r = await Course.find({ id: id })
        courses.push(r[0].name);
    }

    res.status(200).json({
        courses
    })

}