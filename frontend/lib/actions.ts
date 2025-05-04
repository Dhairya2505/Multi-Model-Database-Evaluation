"use server"

import { revalidatePath } from "next/cache"

// Simulated database for storing enrollments
const enrollments: any[] = []

// Simulated query times storage
const queryTimes = {
  readTime: 0,
  writeTime: 0,
  lastUpdated: "",
}

// Function to simulate database read operation with timing
async function simulateDbRead() {
  const startTime = performance.now()

  // Simulate database read latency (100-300ms)
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 200 + 100))

  const endTime = performance.now()
  queryTimes.readTime = endTime - startTime
  queryTimes.lastUpdated = new Date().toLocaleTimeString()

  return enrollments
}

// Function to simulate database write operation with timing
async function simulateDbWrite(data: any) {
  const startTime = performance.now()

  // Simulate database write latency (200-500ms)
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 300 + 200))

  // Add the enrollment to our simulated database
  enrollments.push({
    id: Date.now(),
    ...data,
    enrolledAt: new Date().toISOString(),
  })

  const endTime = performance.now()
  queryTimes.writeTime = endTime - startTime
  queryTimes.lastUpdated = new Date().toLocaleTimeString()

  return true
}

// Server action to enroll a student (simple version)
export async function enrollStudent(data: { studentName: string }) {
  // Validate the data
  if (!data.studentName) {
    throw new Error("Missing required fields")
  }

  // Simulate database write operation
  await simulateDbWrite(data)

  // Revalidate the page to show updated data
  revalidatePath("/")

  return { success: true }
}

// Server action to enroll a student with course (complete version)
export async function enrollStudentWithCourse(data: {
  studentName: string
  course: string
}) {
  // Validate the data
  if (!data.studentName || !data.course) {
    throw new Error("Missing required fields")
  }

  // Simulate database write operation
  await simulateDbWrite(data)

  // Revalidate the page to show updated data
  revalidatePath("/")

  return { success: true }
}

// Server action to get query times
export async function getQueryTimes() {
  // Simulate a read operation to update the read time
  await simulateDbRead()

  return queryTimes
}
