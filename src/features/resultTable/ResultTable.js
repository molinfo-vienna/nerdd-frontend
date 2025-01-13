import { sortedIndexBy } from "lodash"
import PropTypes from "prop-types"
import React from "react"
import { moduleType, resultType } from "../../types"
import TableCell from "./TableCell"
import getColumnRows from "./getColumnRows"
import "./style.scss"

export default function ResultTable({ module, results, columnSelection }) {
    //
    // check visibility of columns
    //
    const isVisible = (resultProperty) => {
        if (columnSelection === undefined) {
            return true
        }
        const group = resultProperty.group ?? "General"
        const columnGroup = columnSelection.filter(
            (g) => g.groupName === group,
        )[0]
        const column = columnGroup.columns.filter(
            (c) => c.name === resultProperty.name,
        )[0]
        return column.visible ?? true
    }

    const resultProperties = module.resultProperties.filter(isVisible) ?? []

    const { firstColumnRow, secondColumnRow } = getColumnRows(resultProperties)

    // the columns describing the result data
    const actualColumns =
        secondColumnRow.length > 0 ? secondColumnRow : firstColumnRow

    //
    // prepare data for arranging it in a table
    //

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

    // entries might have multiple child rows (atoms, derivatives)
    // --> group results by molecule id
    const resultsGroupedByMolId = results.reduce((acc, result, index) => {
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

    //
    // render table
    //
    const tableContent = resultsGroupedByMolId.map((group, i) =>
        group.children.map((result, j) => (
            <tr key={`m${i}c${j}`}>
                {actualColumns.map(
                    (resultProperty, k) =>
                        (resultProperty.level !== "molecule" || j === 0) && (
                            <TableCell
                                key={k}
                                resultProperty={resultProperty}
                                value={result[resultProperty.name]}
                                rowSpan={
                                    resultProperty.level === "molecule"
                                        ? group.children.length
                                        : 1
                                }
                                compressed={resultProperty.level !== "molecule"}
                            />
                        ),
                )}
            </tr>
        )),
    )

    return (
        <table
            className={`table text-center table-sm w-auto ${module.task === "molecular_property_prediction" ? "align-middle" : "align-top"}`}
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
            <tbody className="table-group-divider">{tableContent}</tbody>
        </table>
    )
}

ResultTable.propTypes = {
    module: moduleType.isRequired,
    results: PropTypes.arrayOf(resultType).isRequired,
    columnSelection: PropTypes.array,
}
