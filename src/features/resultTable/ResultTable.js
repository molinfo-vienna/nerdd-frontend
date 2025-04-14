import { sortedIndexBy } from "lodash"
import PropTypes from "prop-types"
import React, { memo, useMemo } from "react"
import { moduleType, resultPropertyType, resultType } from "../../types"
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
    atomColorProperty,
}) {
    const palettes = useColorPalettes()

    //
    // check visibility and style of columns
    //
    // TODO: move colorPalettes to separate hook
    const { resultProperties, firstColumnRow, secondColumnRow, colorPalettes } =
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
                module.resultProperties.map((resultProperty) => [
                    resultProperty.name,
                    getColorPalette(palettes, resultProperty),
                ]),
            )

            const { firstColumnRow, secondColumnRow } =
                getColumnRows(resultProperties)

            const augmentedResultProperties = resultProperties.map(
                (resultProperty, i) => {
                    // check start and end of column block
                    const previousLevel =
                        i > 0 ? resultProperties[i - 1].level : "molecule"
                    const currentLevel = resultProperty.level
                    const nextLevel =
                        i < resultProperties.length - 1
                            ? resultProperties[i + 1]
                            : "molecule"

                    const startBlock =
                        previousLevel === "molecule" &&
                        ["atom", "derivative"].includes(currentLevel)

                    const endBlock =
                        ["atom", "derivative"].includes(currentLevel) &&
                        nextLevel === "molecule"

                    return {
                        ...resultProperty,
                        startBlock,
                        endBlock,
                    }
                },
            )

            return {
                resultProperties: augmentedResultProperties,
                firstColumnRow,
                secondColumnRow,
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
                {resultsGroupedByMolId.map((group) => (
                    <TableRowGroup
                        key={group.mol_id}
                        group={group}
                        resultProperties={resultProperties}
                        module={module}
                        colorPalettes={colorPalettes}
                        atomColorProperty={atomColorProperty}
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
    atomColorProperty: resultPropertyType,
}

export default ResultTable
