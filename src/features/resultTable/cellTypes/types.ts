import type { Module, Result } from "@/types"
import type React from "react"
import type { AugmentedResultProperty, ResultGroup } from "../resultTableSlice"

export type CellRendererProps = {
    module: Module
    result: Result
    resultProperty: AugmentedResultProperty
    group: ResultGroup
    selectedAtom?: number
    className?: string
    onAtomSelect?: (atomId?: number) => void
    value: any
    compressed: boolean
}

export type CellRenderer = (props: CellRendererProps) => React.ReactNode
