"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { enrollStudent, getQueryTimes } from "@/lib/actions"
import { toast } from "sonner"
import { QueryTimeDisplay } from "@/components/query-time-display"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"

interface student {
  id: string
  Name : string
}

export function SimpleEnrollmentForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [studentName, setStudentName] = useState("")
  const [queryTimes, setQueryTimes] = useState(0)
  const [students, setStudents] = useState<null | student[]>(null);
  const [courses, setCourses] = useState<string[]>([]);

  useEffect(() => {
    const fetchQueryTimes = async () => {
      try {
        const res1 = await axios.get(`http://localhost:8000/students`)
        setStudents(res1.data.result)
      } catch (error) {
        console.error("Failed to fetch query times:", error)
      }
    }

    fetchQueryTimes()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!studentName) {
      toast("Validation Error", {
        description: "Please enter a student name"
      })
      return
    }

    setIsLoading(true)

    try {

      const time = Date.now()
      const res = await axios.post(`http://localhost:8000/student`, {
        student: studentName
      })

      setCourses(res.data.courses)

      setQueryTimes(Date.now() - time);

      setStudentName("")


      toast("Enrollment Successful", {
        description: `${studentName} has been enrolled`,
      })

      // Reset form
      setStudentName("")

    } catch (error) {
      toast("Enrollment Failed", {
        description: "There was an error processing your enrollment"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleStudentChange = (value: string) => {
    setStudentName(value)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Simple Enrollment</CardTitle>
        <CardDescription>Enter student name only</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex flex-col flex-1">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student">Student Name</Label>
            <Select value={studentName} onValueChange={handleStudentChange}>
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
            <div>
              {
                courses.map((course) => {
                  return <div>
                    {course}
                  </div>
                })
              }
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-4 mt-auto">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Enroll Student"}
          </Button>

          <QueryTimeDisplay type={"Read"} queryTimes={queryTimes} />
        </CardFooter>
      </form>
    </Card>
  )
}