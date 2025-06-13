import useColorPalettes from "@/features/colorPalettes/useColorPalettes"
import type { Module, ResultProperty } from "@/types"
import { memo, useMemo } from "react"
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
    atomColorProperty?: ResultProperty
}

const ResultTable = memo(function ResultTable({
    module,
    resultsGroupedByMolId,
    firstColumnRow,
    secondColumnRow,
    resultProperties,
    atomColorProperty,
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
                className="table text-center table-sm w-auto align-middle"
                // TODO: put in class
                style={{
                    overflowX: "visible",
                    overflowY: "visible",
                }}
            >
                <thead className="sticky-top fs-7">
                    <tr key="firstRow">
                        {firstColumnRow.map((column) => (
                            <th
                                scope="col"
                                key={column.name}
                                rowSpan={column.rowspan}
                                colSpan={column.colspan}
                            >
                                {column.colspan > 1 ? (
                                    <div className="border-bottom border-primary mx-3 py-2">
                                        {column.visibleName}
                                    </div>
                                ) : (
                                    column.visibleName
                                )}
                            </th>
                        ))}
                    </tr>
                    {secondColumnRow.length > 0 && (
                        <tr key="secondRow">
                            {secondColumnRow.map((column) => (
                                <th
                                    scope="col"
                                    key={column.name}
                                    rowSpan={column.rowspan}
                                    colSpan={column.colspan}
                                >
                                    {column.visibleName}
                                </th>
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
                            atomColorProperty={atomColorProperty}
                            propertyPalettes={propertyPalettes}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
})

export default ResultTable
