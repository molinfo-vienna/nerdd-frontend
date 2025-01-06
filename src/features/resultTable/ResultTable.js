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

    let getId
    if (module.task === "molecular_property_prediction") {
        getId = (result) => result.mol_id
    } else if (module.task === "atom_property_prediction") {
        getId = (result) => `m${result.mol_id}a${result.atom_id}`
    } else if (module.task === "derivative_property_prediction") {
        getId = (result) => `m${result.mol_id}d${result.derivative_id}`
    } else {
        throw new Error(`Unknown task: ${module.task}`)
    }

    let tableContent

    // find molecular properties
    let molecularProperties = resultProperties.filter(
        (resultProperty) =>
            resultProperty.level === undefined ||
            resultProperty.level === "molecule",
    )

    // find other properties (atom or derivative)
    let otherProperties = resultProperties.filter(
        (resultProperty) =>
            resultProperty.level !== undefined &&
            resultProperty.level !== "molecule",
    )

    // group results by molecule id
    let groupedResults = []
    const idMapping = {}
    let getSubId
    if (module.task === "molecular_property_prediction") {
        getSubId = (result) => 0
    } else if (module.task === "atom_property_prediction") {
        getSubId = (result) => result.atom_id
    } else if (module.task === "derivative_property_prediction") {
        getSubId = (result) => result.derivative_id
    } else {
        throw new Error(`Unknown task: ${module.task}`)
    }
    results.forEach((result) => {
        const id = result.mol_id
        if (!(id in idMapping)) {
            idMapping[id] = groupedResults.length
            let newEntry = {
                ...Object.fromEntries(
                    molecularProperties.map((p) => [p.name, result[p.name]]),
                ),
                children: [],
            }
            groupedResults.push(newEntry)
        }

        // add atom or derivative properties
        const subId = getSubId(result)
        groupedResults[idMapping[id]].children[subId] = Object.fromEntries(
            otherProperties.map((p) => [p.name, result[p.name]]),
        )
    })

    // remove undefined children (usually index 0)
    groupedResults = groupedResults.map((result) => ({
        ...result,
        children: result.children.filter((child) => child !== undefined),
    }))

    // sort groupedResults by molecule id
    groupedResults.sort((a, b) => a.mol_id - b.mol_id)

    tableContent = groupedResults.map((result, i) =>
        result.children.map((child, j) =>
            j === 0 ? (
                <tr key={`m${i}c${j}`}>
                    {molecularProperties.map((resultProperty, i) => (
                        <TableCell
                            key={i}
                            resultProperty={resultProperty}
                            value={result[resultProperty.name]}
                            rowSpan={result.children.length}
                        />
                    ))}
                    {otherProperties.map((resultProperty, i) => (
                        <TableCell
                            key={molecularProperties.length + i}
                            resultProperty={resultProperty}
                            value={child[resultProperty.name]}
                            compressed
                        />
                    ))}
                </tr>
            ) : (
                <tr key={`m${i}c${j}`}>
                    {otherProperties.map((resultProperty, i) => (
                        <TableCell
                            key={molecularProperties.length + i}
                            resultProperty={resultProperty}
                            value={child[resultProperty.name]}
                            compressed
                        />
                    ))}
                </tr>
            ),
        ),
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
                            {column.visibleName}
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
