"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { toast } from "sonner";

import { Step1PersonalInfo, PersonalInfo } from "./Step1PersonalInfo";
import { Step2JobDetails } from "./Step2JobDetails";

interface SkillPreference {
  skill: string;
  experience: string;
}

interface SkillsInfo {
  primarySkills: SkillPreference[]; // নির্বাচিত স্কিল এবং প্রতিটির experience
  workingHours: { start: string; end: string }; // Preferred working hours
  remotePreference: number; // Remote work slider (0-100)
  extraNotes: string; // Optional notes (max 500 chars)
}
export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 state
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    profilePicture: null,
  });
  const [errors, setErrors] = useState<any>({});

  // Step 2 state
  const [jobInfo, setJobInfo] = useState<any>({
    department: "",
    positionTitle: "",
    startDate: "",
    jobType: "",
    salary: "",
    manager: "",
  });

  // MultiStepForm এ state:
  const [skillsInfo, setSkillsInfo] = useState<SkillsInfo>({
    primarySkills: [],
    workingHours: { start: "", end: "" },
    remotePreference: 0,
    extraNotes: "",
  });

  const validateStep1 = (): boolean => {
    const newErrors: any = {};
    if (!personalInfo.fullName.trim())
      newErrors.fullName = "Full name is required";
    else if (personalInfo.fullName.trim().split(" ").length < 2)
      newErrors.fullName = "Full name must contain at least 2 words";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!personalInfo.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(personalInfo.email))
      newErrors.email = "Invalid email";

    const phoneRegex = /^\d{1}-\d{3}-\d{3}-\d{4}$/;
    if (!personalInfo.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    else if (!phoneRegex.test(personalInfo.phoneNumber))
      newErrors.phoneNumber = "Invalid format";

    if (!personalInfo.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) return;
    setCurrentStep((prev) => prev + 1);
    toast.success(`Step ${currentStep} completed`);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" /> Step {currentStep}
            </CardTitle>
            <CardDescription>Fill the form to continue</CardDescription>
          </div>
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of 3
          </div>
        </div>
        <Progress value={(currentStep / 3) * 100} className="w-full" />
      </CardHeader>

      <CardContent className="space-y-6">
        {currentStep === 1 && (
          <Step1PersonalInfo
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            errors={errors}
            setErrors={setErrors}
          />
        )}

        {currentStep === 2 && (
          <Step2JobDetails
            jobInfo={jobInfo}
            setJobInfo={setJobInfo}
            errors={errors}
            setErrors={setErrors}
          />
        )}

        {currentStep === 3 && (
          <Step3SkillsPreferences
            skillsInfo={skillsInfo}
            setSkillsInfo={setSkillsInfo}
            errors={errors}
            setErrors={setErrors}
          />
        )}

        {currentStep === 4 && (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">
              Step 3: Review & Submit
            </h3>
            <pre className="text-left p-2 bg-gray-100 rounded">
              {JSON.stringify({ personalInfo, jobInfo }, null, 2)}
            </pre>
          </div>
        )}

        <div className="flex justify-between pt-6">
          <Button
            onClick={handleBack}
            variant="outline"
            disabled={currentStep === 1}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {currentStep === 3 ? "Submit" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
