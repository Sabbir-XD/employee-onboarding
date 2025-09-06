"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Upload, User, Calendar, Mail, Phone, ImageIcon } from "lucide-react"

export interface PersonalInfo {
  fullName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  profilePicture: File | null
}

interface Props {
  personalInfo: PersonalInfo
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>
  errors: Partial<PersonalInfo>
  setErrors: React.Dispatch<React.SetStateAction<Partial<PersonalInfo>>>
}

export function Step1PersonalInfo({
  personalInfo,
  setPersonalInfo,
  errors,
  setErrors,
}: Props) {
  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (digits.length >= 10)
      return `${digits[0]}-${digits.slice(1, 4)}-${digits.slice(
        4,
        7
      )}-${digits.slice(7, 11)}`
    if (digits.length >= 7)
      return `${digits[0]}-${digits.slice(1, 4)}-${digits.slice(4)}`
    if (digits.length >= 4) return `${digits[0]}-${digits.slice(1)}`
    return digits
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      toast.error("Please upload a JPG or PNG image")
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Please upload an image smaller than 2MB")
      return
    }

    setPersonalInfo((prev) => ({ ...prev, profilePicture: file }))
    toast.success("Profile picture uploaded successfully")
  }

  return (
    <div className="space-y-6">
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="flex items-center gap-2">
          <User className="h-4 w-4" /> Full Name *
        </Label>
        <Input
          id="fullName"
          placeholder="Enter your full name (first and last)"
          value={personalInfo.fullName}
          onChange={(e) =>
            setPersonalInfo((prev) => ({ ...prev, fullName: e.target.value }))
          }
          className={errors.fullName ? "border-destructive" : ""}
        />
        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail className="h-4 w-4" /> Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          value={personalInfo.email}
          onChange={(e) =>
            setPersonalInfo((prev) => ({ ...prev, email: e.target.value }))
          }
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className="flex items-center gap-2">
          <Phone className="h-4 w-4" /> Phone Number *
        </Label>
        <Input
          id="phoneNumber"
          placeholder="1-123-456-7890"
          value={personalInfo.phoneNumber}
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value)
            setPersonalInfo((prev) => ({ ...prev, phoneNumber: formatted }))
          }}
          className={errors.phoneNumber ? "border-destructive" : ""}
          maxLength={14}
        />
        {errors.phoneNumber && (
          <p className="text-sm text-destructive">{errors.phoneNumber}</p>
        )}
      </div>

      {/* Date of Birth */}
      <div className="space-y-2">
        <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" /> Date of Birth *
        </Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={personalInfo.dateOfBirth}
          onChange={(e) =>
            setPersonalInfo((prev) => ({ ...prev, dateOfBirth: e.target.value }))
          }
          className={errors.dateOfBirth ? "border-destructive" : ""}
          max={new Date(
            new Date().setFullYear(new Date().getFullYear() - 18)
          )
            .toISOString()
            .split("T")[0]}
        />
        {errors.dateOfBirth && (
          <p className="text-sm text-destructive">{errors.dateOfBirth}</p>
        )}
        <p className="text-sm text-muted-foreground">
          You must be at least 18 years old
        </p>
      </div>

      {/* Profile Picture */}
      <div className="space-y-2">
        <Label htmlFor="profilePicture" className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4" /> Profile Picture (Optional)
        </Label>
        <div className="flex items-center gap-4">
          <Input
            id="profilePicture"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              document.getElementById("profilePicture")?.click()
            }
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" /> Choose File
          </Button>
          {personalInfo.profilePicture && (
            <span className="text-sm text-muted-foreground">
              {personalInfo.profilePicture.name}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          JPG or PNG only, max size 2MB
        </p>
      </div>
    </div>
  )
}
