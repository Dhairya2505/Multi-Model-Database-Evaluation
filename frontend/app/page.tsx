import { CompleteEnrollmentForm } from "@/components/complete-enrollment-form"
import { SimpleEnrollmentForm } from "@/components/simple-enrollment-form"

export default function CoursePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Course Enrollment System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CompleteEnrollmentForm />
        <SimpleEnrollmentForm />
      </div>
    </div>
  )
}