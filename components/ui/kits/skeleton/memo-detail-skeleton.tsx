
import Skeleton, { ICustomViewStyle } from "react-native-reanimated-skeleton"

interface MemoDetailSkeletonProps {
    isLoading: boolean
    children: React.ReactNode
}

const SkeletonDetail: ICustomViewStyle = {
    key: "container", 
    flexDirection: "column", 
    padding: 24,
    alignItems: "flex-start",
    gap: 16,
    justifyContent: "flex-start",
    children: [
        { key: "header", width: "75%", height: 20, borderRadius: 16 },
        { key: "pill", width: "50%", height: 20, borderRadius: 16 },
        { key: `divider_1`, width: 500, height: 2, marginVertical: 8, marginHorizontal: -24 },
        { key: `box1`, gap: 12, flexDirection: "row", children: [
            { key: `icon1`, width: 40, height: 40, borderRadius: 8 },
            { key: `text1`, width: "75%", height: 20, borderRadius: 16 },
        ] },
        { key: `box2`, gap: 12, flexDirection: "row", children: [
            { key: `icon2`, width: 40, height: 40, borderRadius: 8 },
            { key: `text2`, width: "75%", height: 20, borderRadius: 16 },
        ] },
        { key: `box3`, gap: 12, flexDirection: "row", children: [
            { key: `icon3`, width: 40, height: 40, borderRadius: 8 },
            { key: `text3`, width: "75%", height: 20, borderRadius: 16 },
        ] },
        { key: `section`, width: "50%", height: 20, borderRadius: 16 },
        { key: `detail`, width: "100%", height: 20, borderRadius: 16 },
        { key: `detail2`, width: "100%", height: 20, borderRadius: 16 },
        { key: `detail3`, width: "100%", height: 20, borderRadius: 16 },
        { key: `detail4`, width: "75%", height: 20, borderRadius: 16 },
    ]
}

export default function MemoDetailSkeleton({ isLoading, children }: Readonly<MemoDetailSkeletonProps>) {
    return (
        <Skeleton
            containerStyle={{ width: "100%", height: "100%" }}
            isLoading={isLoading}
            layout={[SkeletonDetail]}
        >
            {children}
        </Skeleton>
    )
}