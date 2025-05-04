import { Request, Response } from "express";
import { Student } from "../../models/models.js";

export const mongo_store_details = async (req: Request, res: Response) => {

    const { student, course } = req.body;

    try {

        await Student.updateOne(
            { id: student },
            { $push: { courses: course } }
        );

        res.status(200).json({
            msg: 'successful'
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Error'
        })
    }

}