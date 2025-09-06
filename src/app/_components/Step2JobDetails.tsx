"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface JobInfo {
  department: string
  positionTitle: string
  startDate: string
  jobType: string
  salary: string
  manager: string
}

interface Props {
  jobInfo: JobInfo
  setJobInfo: React.Dispatch<React.SetStateAction<JobInfo>>
  errors: Partial<JobInfo>
  setErrors: React.Dispatch<React.SetStateAction<Partial<JobInfo>>>
}

export function Step2JobDetails({ jobInfo, setJobInfo, errors }: Props) {
  const formatSalaryPlaceholder = () =>
    jobInfo.jobType === "Full-time"
      ? "Annual salary ($30,000 - $200,000)"
      : "Hourly rate ($50 - $150)"

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Step 2: Job Details</h3>

      {/* Department */}
      <div className="space-y-2">
        <Label htmlFor="department">Department *</Label>
        <select
          id="department"
          value={jobInfo.department}
          onChange={(e) =>
            setJobInfo((prev) => ({ ...prev, department: e.target.value, manager: "" }))
          }
          className="w-full border rounded-md p-2"
        >
          <option value="">Select Department</option>
          {["Engineering", "Marketing", "Sales", "HR", "Finance"].map((dep) => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>
        {errors.department && <p className="text-sm text-destructive">{errors.department}</p>}
      </div>

      {/* Position Title */}
      <div className="space-y-2">
        <Label htmlFor="positionTitle">Position Title *</Label>
        <Input
          id="positionTitle"
          placeholder="Enter position title"
          value={jobInfo.positionTitle}
          onChange={(e) =>
            setJobInfo((prev) => ({ ...prev, positionTitle: e.target.value }))
          }
          className={errors.positionTitle ? "border-destructive" : ""}
        />
        {errors.positionTitle && <p className="text-sm text-destructive">{errors.positionTitle}</p>}
      </div>

      {/* Start Date */}
      <div className="space-y-2">
        <Label htmlFor="startDate">Start Date *</Label>
        <Input
          id="startDate"
          type="date"
          value={jobInfo.startDate}
          onChange={(e) => setJobInfo((prev) => ({ ...prev, startDate: e.target.value }))}
          className={errors.startDate ? "border-destructive" : ""}
          min={new Date().toISOString().split("T")[0]}
          max={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
        />
        {errors.startDate && <p className="text-sm text-destructive">{errors.startDate}</p>}
      </div>

      {/* Job Type */}
      <div className="space-y-2">
        <Label>Job Type *</Label>
        <div className="flex gap-4">
          {["Full-time", "Part-time", "Contract"].map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="radio"
                name="jobType"
                value={type}
                checked={jobInfo.jobType === type}
                onChange={(e) =>
                  setJobInfo((prev) => ({ ...prev, jobType: e.target.value, salary: "" }))
                }
              />
              {type}
            </label>
          ))}
        </div>
        {errors.jobType && <p className="text-sm text-destructive">{errors.jobType}</p>}
      </div>

      {/* Salary */}
      {jobInfo.jobType && (
        <div className="space-y-2">
          <Label htmlFor="salary">Salary Expectation *</Label>
          <Input
            id="salary"
            type="number"
            placeholder={formatSalaryPlaceholder()}
            value={jobInfo.salary}
            onChange={(e) =>
              setJobInfo((prev) => ({ ...prev, salary: e.target.value }))
            }
            className={errors.salary ? "border-destructive" : ""}
          />
          {errors.salary && <p className="text-sm text-destructive">{errors.salary}</p>}
        </div>
      )}

      {/* Manager */}
      <div className="space-y-2">
        <Label htmlFor="manager">Manager</Label>
        <Input
          id="manager"
          placeholder="Search manager..."
          value={jobInfo.manager}
          onChange={(e) => setJobInfo((prev) => ({ ...prev, manager: e.target.value }))}
        />
        <p className="text-sm text-muted-foreground">
          Filtered by department: {jobInfo.department || "All"}
        </p>
      </div>
    </div>
  )
}
