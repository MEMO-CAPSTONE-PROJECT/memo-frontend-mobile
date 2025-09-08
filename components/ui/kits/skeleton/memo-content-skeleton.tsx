import Skeleton, { ICustomViewStyle } from "react-native-reanimated-skeleton";

interface MemoContentSkeletonProps {
    children: React.ReactNode
    isLoading: boolean
}

const SkeletonContent = (index: number): ICustomViewStyle[] => (
    [
        { key: `header_${index}`, width: "75%", height: 20, borderRadius: 16 },
        { key: `pill_${index}`, width: "50%", height: 20, borderRadius: 16 },
        { key: `box1_${index}`, gap: 12, flexDirection: "row", children: [
            { key: `icon1_${index}`, width: 40, height: 40, borderRadius: 8 },
            { key: `text1_${index}`, width: "75%", height: 20, borderRadius: 16 },
        ] },
        { key: `box2_${index}`, gap: 12, flexDirection: "row", children: [
            { key: `icon2_${index}`, width: 40, height: 40, borderRadius: 8 },
            { key: `text2_${index}`, width: "75%", height: 20, borderRadius: 16 },
        ] },
        { key: `box3_${index}`, gap: 12, flexDirection: "row", children: [
            { key: `icon3_${index}`, width: 40, height: 40, borderRadius: 8 },
            { key: `text3_${index}`, width: "75%", height: 20, borderRadius: 16 },
        ] },
        { key: `detail_${index}`, width: "50%", height: 20, borderRadius: 16 },
    ]
)

const SkeletonContainer: ICustomViewStyle = { 
    key: "container", 
    flexDirection: "column", 
    width: "100%",
    height: "100%",
    paddingHorizontal: 24,
    paddingVertical: 6,
    alignItems: "flex-start",
    gap: 16,
    justifyContent: "flex-start",
    children: [
        ...SkeletonContent(1),
        { key: `divider_1`, width: 500, height: 2, marginHorizontal: -24 },
        ...SkeletonContent(2),
        { key: `divider_2`, width: 500, height: 2, marginHorizontal: -24 },
    ]
}

export default function MemoContentSkeleton({ children, isLoading }: Readonly<MemoContentSkeletonProps>) {
    return (
        <Skeleton 
            isLoading={isLoading}
            layout={[SkeletonContainer]}                        
        >
            {children}
        </Skeleton>
    )
}