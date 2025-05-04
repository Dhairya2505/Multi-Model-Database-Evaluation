"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { enrollStudent, getQueryTimes } from "@/lib/actions"
import { toast } from "sonner"

export function CourseEnrollmentForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [studentName, setStudentName] = useState("")
  const [queryTimes, setQueryTimes] = useState({
    readTime: 0,
    writeTime: 0,
    lastUpdated: "",
  })

  useEffect(() => {
    const fetchQueryTimes = async () => {
      try {
        const times = await getQueryTimes()
        setQueryTimes(times)
      } catch (error) {
        console.error("Failed to fetch query times:", error)
      }
    }

    fetchQueryTimes()
    const interval = setInterval(fetchQueryTimes, 5000)
    return () => clearInterval(interval)
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
      await enrollStudent({ studentName })

      toast("Enrollment Successful", {
        description: `${studentName} has been enrolled`
      })

      // Reset form
      setStudentName("")

      // Refresh the page to update query times
      router.refresh()

      // Update query times
      const times = await getQueryTimes()
      setQueryTimes(times)
    } catch (error) {
      toast("Enrollment Failed", {
        description: "There was an error processing your enrollment"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enroll in a Course</CardTitle>
        <CardDescription>Enter student information</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="studentName">Student Name</Label>
            <Input
              id="studentName"
              placeholder="Enter student name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Enroll Student"}
          </Button>

          <div className="w-full pt-4 border-t space-y-4">
            <h3 className="text-sm font-medium">Query Performance Metrics</h3>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs">Read Operation</span>
                <span className="text-xs text-muted-foreground">{queryTimes.readTime.toFixed(2)} ms</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, queryTimes.readTime / 10)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs">Write Operation</span>
                <span className="text-xs text-muted-foreground">{queryTimes.writeTime.toFixed(2)} ms</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, queryTimes.writeTime / 10)}%` }}
                ></div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-right">
              Last updated: {queryTimes.lastUpdated || "Never"}
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}