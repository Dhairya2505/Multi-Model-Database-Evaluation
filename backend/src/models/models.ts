import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    id: String,
    name: String,
    courses: [String],
});

const courseSchema = new mongoose.Schema({
    id: String,
    name: String,
    instructor: String
})

export const Student = mongoose.model('student', studentSchema);
export const Course = mongoose.model('course', courseSchema);