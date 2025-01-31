import { StudentAchievement, TeacherAchievement } from "@/shared/types/achievement-type"
import { useMemo, useState } from "react"

export function useStudentAchievementFilters(achievements: StudentAchievement[]) {
    const [isOpen, setIsOpen] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    
    const sortedAchievements = useMemo(
        () => [...achievements].sort((a, b) => a.name.localeCompare(b.name)),
        [achievements]
    )

    const filteredAchievements = useMemo(
        () => sortedAchievements.filter(
          (achievement) => 
            achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
            (achievement?.isOpen ?? false) === isOpen
        ),
        [sortedAchievements, isOpen, searchQuery]
    )

    return {
        searchQuery,
        setSearchQuery,
        filteredAchievements,
        isOpen,
        setIsOpen
    }
}

export function useTeacherAchievementFilters(teacherId: string, achievements: TeacherAchievement[]) {
    const [isOwner, setIsOwner] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    
    const sortedAchievements = useMemo(
        () => [...achievements].sort((a, b) => a.name.localeCompare(b.name)),
        [achievements]
    )

    const filteredAchievements = useMemo(
        () => sortedAchievements.filter(
            (achievement) => 
                achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
                (!isOwner || (isOwner && achievement.teacherId === teacherId))
        ),
        [sortedAchievements, isOwner, searchQuery, teacherId]
    )

    return {
        searchQuery,
        setSearchQuery,
        filteredAchievements,
        isOwner,
        setIsOwner
    }
}
