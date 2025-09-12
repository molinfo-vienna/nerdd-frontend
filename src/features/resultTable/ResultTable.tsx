import useColorPalettes from "@/features/colorPalettes/useColorPalettes"
import type { Module } from "@/types"
import { memo, useMemo } from "react"
import ColumnHeader from "./ColumnHeader"
import getColorPalette from "./getColorPalette"
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
    //
    // compute color palettes once (to improve memoization)
    //
    const palettes = useColorPalettes()

    const propertyPalettes: Record<string, any> = useMemo(() => {
        return Object.fromEntries(
            module.resultProperties.map((resultProperty) => [
                resultProperty.name,
                getColorPalette(palettes, resultProperty),
            ]),
        )
    }, [module.resultProperties, palettes])

    return (
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
                            propertyPalettes={propertyPalettes}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
})

export default ResultTable
