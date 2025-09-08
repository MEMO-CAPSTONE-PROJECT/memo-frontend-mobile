import React, { Fragment, useCallback, useEffect, useState } from "react"

interface MemoTimerProps {
    initialTime: number
    onTimeout?: () => void
    children: (time: number, reset: () => void) => React.ReactNode
}

export const MemoTimer: React.FC<MemoTimerProps> = ({ initialTime, onTimeout, children }) => {
    const [time, setTime] = useState(initialTime)

    const reset = useCallback(() => {
        setTime(initialTime)
    }, [initialTime])

    useEffect(() => {
        if (time > 0) {
            const timeout = setTimeout(() => setTime((prev) => prev - 1), 1000)
            return () => clearTimeout(timeout)
        } else {
            onTimeout?.()
        }
    }, [time, onTimeout])

    return (
        <Fragment>
            {children(time, reset)}
        </Fragment>
    )
}