import { sortedIndexBy } from "lodash"
import PropTypes from "prop-types"
import React, { memo, useMemo } from "react"
import { moduleType, resultType } from "../../types"
import useColorPalettes from "../colorPalettes/useColorPalettes"
import getColorPalette from "./getColorPalette"
import getColumnRows from "./getColumnRows"
import "./style.scss"
import TableRowGroup from "./TableRowGroup"

const ResultTable = memo(function ResultTable({
    module,
    pageOneBased,
    results,
    columnSelection,
}) {
    const palettes = useColorPalettes()

    //
    // check visibility and style of columns
    //
    const { firstColumnRow, secondColumnRow, valueColumns, colorPalettes } =
        useMemo(() => {
            const isVisible = (resultProperty) => {
                const group = resultProperty.group ?? "General"
                const columnGroup = columnSelection.find(
                    (g) => g.groupName === group,
                )
                if (columnGroup === undefined) return true
                const column = columnGroup.columns.find(
                    (c) => c.name === resultProperty.name,
                )
                return column.visible ?? true
            }

            const resultProperties =
                module.resultProperties.filter(isVisible) ?? []

            // get color palettes for each result property
            const colorPalettes = Object.fromEntries(
                resultProperties.map((resultProperty) => [
                    resultProperty.name,
                    getColorPalette(palettes, resultProperty),
                ]),
            )

            return {
                ...getColumnRows(resultProperties),
                colorPalettes,
            }
        }, [module.resultProperties, columnSelection, palettes])

    //
    // prepare data for arranging it in a table
    //

    // entries might have multiple child rows (atoms, derivatives)
    // --> group results by molecule id
    const resultsGroupedByMolId = useMemo(() => {
        // sort results by molecule id (and atom id or derivative id)
        // -> construct a comparison function for sorting
        let subKey
        if (module.task === "molecular_property_prediction") {
            subKey = (a) => 0
        } else if (module.task === "atom_property_prediction") {
            subKey = (a) => a.atom_id
        } else if (module.task === "derivative_property_prediction") {
            subKey = (a) => a.derivative_id
        } else {
            throw new Error(`Unknown task: ${module.task}`)
        }

        return results.reduce((acc, result, index) => {
            // find corresponding mol_id in acc
            const groupIndex = sortedIndexBy(acc, result, (x) => x.mol_id)
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
    }, [pageOneBased, results.length, module.task])

    return (
        <table
            className="table text-center table-sm w-auto align-middle"
            style={{
                overflowX: "visible",
                overflowY: "visible",
            }}
        >
            <thead className="sticky-top">
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
            <tbody className="table-group-divider">
                {resultsGroupedByMolId.map((group, i) => (
                    <TableRowGroup
                        key={i}
                        group={group}
                        resultProperties={valueColumns}
                        module={module}
                        colorPalettes={colorPalettes}
                    />
                ))}
            </tbody>
        </table>
    )
})

ResultTable.propTypes = {
    module: moduleType.isRequired,
    pageOneBased: PropTypes.number.isRequired,
    results: PropTypes.arrayOf(resultType).isRequired,
    columnSelection: PropTypes.array,
}

export default ResultTable
