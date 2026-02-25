import { ColorPalettesProvider } from "@/features/colorPalettes/ColorPalettesProvider"
import type { Module } from "@/types"
import { memo } from "react"
import ColumnHeader from "./ColumnHeader"
import type { AugmentedResultProperty, ResultGroup } from "./resultTableSlice"
import { Column } from "./resultTableSlice"
import "./style.css"
import TableRowGroup from "./TableRowGroup"

type ResultTableProps = {
    module: Module
    resultsGroupedByMolId: ResultGroup[]
    firstColumnRow: Column[]
    secondColumnRow: Column[]
    resultProperties: AugmentedResultProperty[]
    onClickSort(column: Column): void
    sortBy?: string
    sortAscending: boolean
}

const ResultTable = memo(function ResultTable({
    module,
    resultsGroupedByMolId,
    firstColumnRow,
    secondColumnRow,
    resultProperties,
    onClickSort,
    sortBy,
    sortAscending,
}: ResultTableProps) {
    return (
        <ColorPalettesProvider resultProperties={module.resultProperties}>
            <div className="table-responsive-xxl">
                <table
                    // align-middle: aligns the text vertically in the middle of the cell
                    //     Note: cells might override this alignment and browsers will complain that
                    //           align-middle has no effect
                    className="table text-center table-sm w-auto align-middle overflow-x-visible overflow-y-visible"
                >
                    <thead className="sticky-top fs-7">
                        <tr key="firstRow">
                            {firstColumnRow.map((column) => (
                                <ColumnHeader
                                    key={column.name}
                                    column={column}
                                    onClickSort={onClickSort}
                                    sortBy={sortBy}
                                    sortAscending={sortAscending}
                                />
                            ))}
                        </tr>
                        {secondColumnRow.length > 0 && (
                            <tr key="secondRow">
                                {secondColumnRow.map((column) => (
                                    <ColumnHeader
                                        key={column.name}
                                        column={column}
                                        onClickSort={onClickSort}
                                        sortBy={sortBy}
                                        sortAscending={sortAscending}
                                    />
                                ))}
                            </tr>
                        )}
                    </thead>
                    <tbody>
                        {resultsGroupedByMolId.map((group: ResultGroup) => (
                            <TableRowGroup
                                key={group.mol_id}
                                group={group}
                                module={module}
                                resultProperties={resultProperties}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </ColorPalettesProvider>
    )
})

export default ResultTable
