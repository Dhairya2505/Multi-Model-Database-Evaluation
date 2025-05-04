"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QueryTimeDisplay } from "@/components/query-time-display"
import { toast } from "sonner"
import axios from "axios"

interface student {
  id: string
  Name : string
}

interface course {
  id: string
  name : string
  instructor: string
}

export function CompleteEnrollmentForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    studentName: "",
    course: "",
  })
  const [pgQueryTimes, setpgQueryTimes] = useState(0)
  const [mongoQueryTimes, setmongoQueryTimes] = useState(0)

  const [students, setStudents] = useState<null | student[]>(null);
  const [courses, setCourses] = useState<null | course[]>(null);

  useEffect(() => {
  
    ( async () => {
      
      const res1 = await axios.get(`http://localhost:8000/students`)
      setStudents(res1.data.result)

      const res2 = await axios.get(`http://localhost:8000/courses`) 
      setCourses(res2.data.result)

    })();
  
  }, [])

  const handleCourseChange = (value: string) => {
    setFormData((prev) => ({ ...prev, course: value }))
  }

  const handleStudentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, studentName: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setpgQueryTimes(0);
    setmongoQueryTimes(0);

    if (!formData.studentName || !formData.course) {
        toast("Validation Error", {
          description: "Please fill in all fields"
        })
      return
    }

    setIsLoading(true)

    try {
      let time = Date.now()
      
      const res1 = await axios.post(`http://localhost:8000/pg-insert-detail`, {
        student: formData.studentName,
        course: formData.course
      })
      setpgQueryTimes(Date.now() - time);
      
      time = Date.now()
      const res2 = await axios.post(`http://localhost:8000/mongo-insert-detail`, {
        student: formData.studentName,
        course: formData.course
      })
      setmongoQueryTimes(Date.now() - time);

      toast("Enrollment Successful", {
        description: `${formData.studentName} has been enrolled in ${formData.course}`
      })

      setFormData({
        studentName: "",
        course: "",
      })
    } catch (error) {
      
      toast("Enrollment Failed", {
        description: "There was an error processing your enrollment"
      })

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="h-full flex flex-col text-black">
      <CardHeader>
        <CardTitle>Complete Enrollment</CardTitle>
        <CardDescription>Enter student name and course</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="studentName">Student Name</Label>
            <Select value={formData.studentName} onValueChange={handleStudentChange}>
              <SelectTrigger id="student">
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
              <SelectContent>
                { students &&
                  students.map((student) => {
                    return <SelectItem value={`${student.id}`}>{student.Name}</SelectItem>
                  })
                }
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Select value={formData.course} onValueChange={handleCourseChange}>
              <SelectTrigger id="course">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                { courses && 
                  courses.map((course) => {
                    return <SelectItem value={`${course.id}`}>{course.name}</SelectItem>
                  })
                }
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-4 mt-auto">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Enroll Student"}
          </Button>

          <QueryTimeDisplay type={"Write"} pgqueryTimes={pgQueryTimes} mongoQueryTimes={mongoQueryTimes} />
        </CardFooter>
      </form>
    </Card>
  )
}