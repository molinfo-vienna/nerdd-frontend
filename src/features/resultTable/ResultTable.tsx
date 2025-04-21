import useColorPalettes from "@/features/colorPalettes/useColorPalettes"
import type { Module, Result, ResultProperty } from "@/types"
import { sortedIndexBy } from "lodash"
import { memo, useMemo } from "react"
import getColorPalette from "./getColorPalette"
import getColumnRows from "./getColumnRows"
import "./style.css"
import TableRowGroup from "./TableRowGroup"

interface AugmentedResultProperty extends ResultProperty {
    startBlock?: boolean
    endBlock?: boolean
    colorScale?: any
}

interface ColumnItem {
    name: string
    visibleName: string
    rowspan: number
    colspan: number
    group?: string
    visible?: boolean
    sortable?: boolean
}

interface ColumnSelection {
    groupName: string
    columns: Array<{ name: string; visible?: boolean }>
}

interface ResultGroup {
    mol_id: number | string
    children: Result[]
}

type ResultTableProps = {
    module: Module
    pageOneBased: number
    results: Result[]
    columnSelection: ColumnSelection[]
    atomColorProperty?: ResultProperty
}

const ResultTable = memo(function ResultTable({
    module,
    results,
    columnSelection,
    atomColorProperty,
}: ResultTableProps) {
    //
    // compute color palettes once (to improve memoization)
    //
    const palettes = useColorPalettes()

    const propertyPalettes = useMemo(() => {
        return Object.fromEntries(
            module.resultProperties.map((resultProperty) => [
                resultProperty.name,
                getColorPalette(palettes, resultProperty),
            ]),
        )
    }, [module.resultProperties, palettes])

    //
    // compute visibility and style of columns
    //
    const { firstColumnRow, secondColumnRow, resultProperties } =
        useMemo(() => {
            const isVisible = (resultProperty: ResultProperty): boolean => {
                const group = resultProperty.group ?? "General"
                const columnGroup = columnSelection.find(
                    (g) => g.groupName === group,
                )
                if (columnGroup === undefined) return true
                const column = columnGroup.columns.find(
                    (c) => c.name === resultProperty.name,
                )
                return column?.visible ?? true
            }

            const visibleResultProperties = module.resultProperties.filter(
                (resultProperty) => isVisible(resultProperty),
            )

            const { firstColumnRow, secondColumnRow } = getColumnRows(
                visibleResultProperties,
            )

            const visibleResultPropertyNames = visibleResultProperties.map(
                (r) => r.name,
            )

            const augmentedResultProperties = module.resultProperties.map(
                (resultProperty) => {
                    const indexOfCurrentProperty =
                        visibleResultPropertyNames.indexOf(resultProperty.name)

                    const visiblePredecessor =
                        indexOfCurrentProperty > 0
                            ? visibleResultProperties[
                                  indexOfCurrentProperty - 1
                              ]
                            : null
                    const visibleSuccessor =
                        indexOfCurrentProperty <
                        visibleResultPropertyNames.length - 1
                            ? visibleResultProperties[
                                  indexOfCurrentProperty + 1
                              ]
                            : null

                    // check start and end of column block
                    const previousLevel =
                        visiblePredecessor !== null
                            ? visiblePredecessor.level
                            : "molecule"
                    const currentLevel = resultProperty.level ?? "molecule"
                    const nextLevel =
                        visibleSuccessor !== null
                            ? visibleSuccessor.level
                            : "molecule"

                    const startBlock =
                        previousLevel === "molecule" &&
                        ["atom", "derivative"].includes(currentLevel)

                    const endBlock =
                        ["atom", "derivative"].includes(currentLevel) &&
                        nextLevel === "molecule"

                    return {
                        ...resultProperty,
                        visible: isVisible(resultProperty),
                        startBlock,
                        endBlock,
                        colorScale: propertyPalettes[resultProperty.name],
                    }
                },
            )

            return {
                firstColumnRow,
                secondColumnRow,
                resultProperties:
                    augmentedResultProperties as AugmentedResultProperty[],
            }
        }, [module, columnSelection, propertyPalettes])

    //
    // prepare data for arranging it in a table
    //

    // entries might have multiple child rows (atoms, derivatives)
    // --> group results by molecule id
    const resultsGroupedByMolId = useMemo(() => {
        // sort results by molecule id (and atom id or derivative id)
        // -> construct a comparison function for sorting
        let subKey: (result: Result) => number
        if (module.task === "molecular_property_prediction") {
            subKey = (_result) => 0
        } else if (module.task === "atom_property_prediction") {
            subKey = (result) => result.atom_id ?? 0
        } else if (module.task === "derivative_property_prediction") {
            subKey = (result) => result.derivative_id ?? 0
        } else {
            throw new Error(`Unknown task: ${module.task}`)
        }

        return results.reduce((acc: ResultGroup[], result) => {
            // find corresponding mol_id in acc
            const groupIndex = sortedIndexBy(
                acc,
                result,
                (x: ResultGroup) => x.mol_id,
            )
            const group = acc[groupIndex]

            // check if mol_id is in acc
            if (group === undefined || group.mol_id !== result.mol_id) {
                // if mol_id is not in acc, add it at the correct index
                acc.splice(groupIndex, 0, {
                    mol_id: result.mol_id,
                    // the row indices to all entries in the molecule's group
                    children: [result],
                })
            } else {
                // if mol_id is in acc, add the entry to the group
                // add entry at the correct index (sorted by atom_id or derivative_id)
                const subIndex = sortedIndexBy(group.children, result, subKey)
                group.children.splice(subIndex, 0, result)
            }

            return acc
        }, [])
    }, [module.task, results])

    return (
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
                    {firstColumnRow.map((column: ColumnItem) => (
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
                        {secondColumnRow.map((column: ColumnItem) => (
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
            <tbody className="table-group-divider">
                {resultsGroupedByMolId.map((group: ResultGroup) => (
                    <TableRowGroup
                        key={group.mol_id}
                        group={group}
                        module={module}
                        resultProperties={resultProperties}
                        atomColorProperty={resultProperties.find(
                            (r) => r.name === atomColorProperty?.name,
                        )}
                    />
                ))}
            </tbody>
        </table>
    )
})

export default ResultTable
