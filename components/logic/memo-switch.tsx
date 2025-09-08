
import React, { ReactElement, ReactNode } from 'react'

/* eslint-disable */
interface CaseProps {
    value?: (test: any) => boolean
    default?: boolean
    children: ReactNode
}
/* eslint-enable */

interface SwitchProps {
    test: any
    children: ReactElement<CaseProps>[]
}

export const MemoSwitch: React.FC<SwitchProps> = ({ test, children }) => {
    const defaultResult = children.find((child) => child.props.default) || null
    const result = children.find((child) => child.props.value?.(test))

    return result || defaultResult
}

export const MemoCase: React.FC<CaseProps> = ({ children }) => <>{children}</>