import { StudentAchievement, TeacherAchievement } from "@/shared/types/achievement-type"
import { useMemo, useState } from "react"

export type FilterMode = "doing" | "open" | "all"

export function useStudentAchievementFilters(
    achievements: StudentAchievement[],
    mode: FilterMode
) {
    const [searchQuery, setSearchQuery] = useState("")

    const sortedAchievements = useMemo(
        () => [...achievements].sort((a, b) => a.name.localeCompare(b.name)),
        [achievements]
    )

    const filteredAchievements = useMemo(
        () => sortedAchievements.filter(
          (achievement) => {
            const matchesSearch = achievement.name.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesMode = mode === "doing" || (mode === "open" && (achievement?.isOpen ?? false) === true) || (mode === "all")
            return matchesSearch && matchesMode
          }
        ),
        [sortedAchievements, searchQuery, mode]
    )

    return {
        searchQuery,
        setSearchQuery,
        filteredAchievements
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
