import MemoAptitudeTree from "@/components/aptitude/memo-aptitude-tree"
import SeedSvg from "@/components/ui/icons/milestone/tree/seed-svg"
import MilestoneTreeStageOneSvg from "@/components/ui/icons/milestone/tree/stage-one-svg"
import MilestoneTreeStageThreeSvg from "@/components/ui/icons/milestone/tree/stage-three-svg"
import MilestoneTreeStageTwoSvg from "@/components/ui/icons/milestone/tree/stage-two-svg"
import { getAptitudeColor } from "@/shared/utils/aptitude-util"

interface MemoTreeLevelProps {
    id: string
    color: string
    level: number
    divide?: number
}

export default function MemoTreeLevel({ id,color, level, divide = 1 }: Readonly<MemoTreeLevelProps>) {
    const hex = getAptitudeColor(color)?.color
    if (level === 1) return <SeedSvg color={hex} size={20/divide} />
    if (level === 2) return <MilestoneTreeStageOneSvg color={hex} size={60/divide} />
    if (level === 3) return <MilestoneTreeStageTwoSvg color={hex} size={100/divide} />
    if (level === 4) return <MilestoneTreeStageThreeSvg color={hex} size={200/divide} />
    if (level >= 5) return <MemoAptitudeTree size={350/divide} id={id} />
    return null
}