import { useMemo } from "react"

interface BrandingBackgroundProps {
    color: "primary" | "secondary" | "error" | "success"
    children: React.ReactNode
}

export default function BrandingBackground({ color, children }: BrandingBackgroundProps) {
    const { background, border } = useMemo(() => {
        const classes = {
            primary: { background: "bg-primary-2", border: "border-primary-3" },
            secondary: { background: "bg-secondary-1", border: "border-secondary-2" },
            error: { background: "bg-system-error", border: "border-primary-3" },
            success: { background: "bg-system-success", border: "border-primary-2" }
        }
        return classes[color]
    }, [color])
    return (
        <div className={background}>
            <div className={`absolute -top-[10rem] -left-[25rem] z-10 border-[140px] ${border} border-opacity-20 w-[588px] h-[588px] rounded-[50%]`}/>
            <div className={`absolute -top-80 -right-[22rem] z-10 border-[100px] ${border} border-opacity-20 w-[538px] h-[538px] rounded-[50%]`}/>
            <div className={`absolute top-60 -right-44 z-10 border-[80px] ${border} border-opacity-20 w-[288px] h-[288px] rounded-[50%]`}/>
            {children}
        </div>
    )
}