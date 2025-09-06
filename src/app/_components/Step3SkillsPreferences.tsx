"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

interface SkillPreference {
  skill: string
  experience: string
}

interface SkillsInfo {
  primarySkills: SkillPreference[]
  workingHours: { start: string; end: string }
  remotePreference: number
  extraNotes: string
}

interface Props {
  skillsInfo: SkillsInfo
  setSkillsInfo: React.Dispatch<React.SetStateAction<SkillsInfo>>
  errors: Partial<SkillsInfo>
  setErrors: React.Dispatch<React.SetStateAction<Partial<SkillsInfo>>>
}

const ALL_SKILLS = ["JavaScript", "React", "Node.js", "TypeScript", "Python", "Django", "CSS", "HTML"]

export function Step3SkillsPreferences({ skillsInfo, setSkillsInfo }: Props) {
  const toggleSkill = (skill: string) => {
    const exists = skillsInfo.primarySkills.find((s) => s.skill === skill)
    if (exists) {
      setSkillsInfo((prev) => ({
        ...prev,
        primarySkills: prev.primarySkills.filter((s) => s.skill !== skill),
      }))
    } else {
      setSkillsInfo((prev) => ({
        ...prev,
        primarySkills: [...prev.primarySkills, { skill, experience: "" }],
      }))
    }
  }

  const updateExperience = (skill: string, value: string) => {
    setSkillsInfo((prev) => ({
      ...prev,
      primarySkills: prev.primarySkills.map((s) =>
        s.skill === skill ? { ...s, experience: value } : s
      ),
    }))
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Step 3: Skills & Preferences</h3>

      {/* Primary Skills */}
      <div className="space-y-2">
        <Label>Primary Skills (choose at least 3)</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {ALL_SKILLS.map((skill) => (
            <div key={skill} className="flex items-center gap-2">
              <Checkbox
                checked={skillsInfo.primarySkills.some((s) => s.skill === skill)}
                onCheckedChange={() => toggleSkill(skill)}
              />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience for Each Skill */}
      {skillsInfo.primarySkills.map((s) => (
        <div key={s.skill} className="space-y-1">
          <Label>Experience for {s.skill} (years)</Label>
          <Input
            type="number"
            min={0}
            placeholder="Enter years of experience"
            value={s.experience}
            onChange={(e) => updateExperience(s.skill, e.target.value)}
          />
        </div>
      ))}

      {/* Preferred Working Hours */}
      <div className="space-y-2">
        <Label>Preferred Working Hours</Label>
        <div className="flex gap-2">
          <Input
            type="time"
            value={skillsInfo.workingHours.start}
            onChange={(e) =>
              setSkillsInfo((prev) => ({
                ...prev,
                workingHours: { ...prev.workingHours, start: e.target.value },
              }))
            }
          />
          <span className="flex items-center">-</span>
          <Input
            type="time"
            value={skillsInfo.workingHours.end}
            onChange={(e) =>
              setSkillsInfo((prev) => ({
                ...prev,
                workingHours: { ...prev.workingHours, end: e.target.value },
              }))
            }
          />
        </div>
      </div>

      {/* Remote Work Preference */}
      <div className="space-y-2">
        <Label>Remote Work Preference (%)</Label>
        <Slider
          value={[skillsInfo.remotePreference]}
          onValueChange={(val) =>
            setSkillsInfo((prev) => ({ ...prev, remotePreference: val[0] }))
          }
          max={100}
        />
        <span>{skillsInfo.remotePreference}%</span>
      </div>

      {/* Extra Notes */}
      <div className="space-y-2">
        <Label>Extra Notes (optional, max 500 chars)</Label>
        <Input
          value={skillsInfo.extraNotes}
          onChange={(e) =>
            setSkillsInfo((prev) => ({ ...prev, extraNotes: e.target.value.slice(0, 500) }))
          }
          placeholder="Any additional notes..."
        />
        <span className="text-sm text-muted-foreground">{skillsInfo.extraNotes.length}/500</span>
      </div>
    </div>
  )
}
