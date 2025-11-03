"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Calendar } from "lucide-react"

function RegistrationForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const eventId = searchParams.get("eventId")

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    studentId: "",
    phoneNumber: "",
    dietaryRestrictions: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  // Check if all required fields are filled
  useEffect(() => {
    const { fullName, email, studentId, phoneNumber } = formData
    const isValid =
      fullName.trim() !== "" && email.trim() !== "" && studentId.trim() !== "" && phoneNumber.trim() !== ""
    setIsFormValid(isValid)
  }, [formData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isFormValid) {
      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h2 className="mb-3 text-2xl font-bold text-foreground">Registration Under Review</h2>
          <p className="mb-6 text-muted-foreground">
            Thank you for registering! Your registration has been submitted and is currently under review. You will
            receive a confirmation email shortly.
          </p>
          <Button onClick={() => router.push("/events")} className="w-full">
            Back to Events
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Event Registration</h1>
              <p className="text-sm text-muted-foreground">Fill out the form below to register for this event</p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@ala.org"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Student ID */}
            <div className="space-y-2">
              <Label htmlFor="studentId">
                Student ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="studentId"
                name="studentId"
                type="text"
                placeholder="Enter your student ID"
                value={formData.studentId}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="+27 XX XXX XXXX"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Dietary Restrictions (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="dietaryRestrictions">Dietary Restrictions (Optional)</Label>
              <Textarea
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                placeholder="Please list any dietary restrictions or allergies"
                value={formData.dietaryRestrictions}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <Button type="submit" className="flex-1" disabled={!isFormValid}>
                Submit Registration
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push("/events")}>
                Cancel
              </Button>
            </div>

            {!isFormValid && (
              <p className="text-sm text-muted-foreground text-center">
                Please fill in all required fields to submit your registration
              </p>
            )}
          </form>
        </Card>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegistrationForm />
    </Suspense>
  )
}
