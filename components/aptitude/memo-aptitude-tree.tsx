import MilestoneTreeAptitudeCompetitionSvg from "@/components/ui/icons/milestone/tree/aptitude/competition-svg"
import MilestoneTreeAptitudeDisciplineSvg from "@/components/ui/icons/milestone/tree/aptitude/discipline-svg"
import MilestoneTreeAptitudeLeadershipSvg from "@/components/ui/icons/milestone/tree/aptitude/leadership-svg"
import MilestoneTreeAptitudeResponsibilitySvg from "@/components/ui/icons/milestone/tree/aptitude/responsibility-svg"
import MilestoneTreeAptitudeSelfConfidentSvg from "@/components/ui/icons/milestone/tree/aptitude/self-confident-svg"
import MilestoneTreeAptitudeVolunteerSvg from "@/components/ui/icons/milestone/tree/aptitude/volunteer-svg"
import MilestoneTreeStageFourSvg from "@/components/ui/icons/milestone/tree/stage-four-svg"

interface MemoAptitudeTreeProps {
    id: string
    size?: number
}

export default function MemoAptitudeTree({ id, size = 165 }: Readonly<MemoAptitudeTreeProps>) {
    switch (id) {
        case "volunteer": return <MilestoneTreeAptitudeVolunteerSvg size={size}/>
        case "self-confident": return <MilestoneTreeAptitudeSelfConfidentSvg size={size}/>
        case "leadership": return <MilestoneTreeAptitudeLeadershipSvg size={size}/>
        case "competition": return <MilestoneTreeAptitudeCompetitionSvg size={size}/>
        case "discipline": return <MilestoneTreeAptitudeDisciplineSvg size={size}/>
        case "responsibility": return <MilestoneTreeAptitudeResponsibilitySvg size={size}/>
        default: return <MilestoneTreeStageFourSvg size={size}/>
    }
}