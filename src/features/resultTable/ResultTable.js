import classNames from "classnames"
import { sortedIndexBy } from "lodash"
import PropTypes from "prop-types"
import React, { useCallback, useMemo, useState } from "react"
import { moduleType, resultType } from "../../types"
import getColumnRows from "./getColumnRows"
import "./style.scss"
import TableCell from "./TableCell"

export default function ResultTable({
    module,
    pageOneBased,
    results,
    columnSelection,
}) {
    //
    // check visibility of columns
    //
    const { firstColumnRow, secondColumnRow, valueColumns } = useMemo(() => {
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

        const resultProperties = module.resultProperties.filter(isVisible) ?? []

        return getColumnRows(resultProperties)
    }, [module.resultProperties, columnSelection])

    const actualColumns = valueColumns

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
    const resultsGroupedByMolId = useMemo(() => {
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
    }, [pageOneBased, results.length, subKey])

    //
    // handle mouse over event
    //
    const [selectedAtom, setSelectedAtom] = useState(undefined)

    const handleAtomSelect = useCallback(
        (e, molId, atomId) => {
            if (e.type == "mouseout") {
                setSelectedAtom(undefined)
            } else if (e.type == "mouseenter") {
                setSelectedAtom({ molId, atomId })
            }
        },
        [setSelectedAtom],
    )

    return (
        <table
            className={classNames("table text-center table-sm w-auto", {
                "align-middle": module.task === "molecular_property_prediction",
                "align-top": module.task !== "molecular_property_prediction",
            })}
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
                {resultsGroupedByMolId.map((group, i) =>
                    group.children.map((result, j) => (
                        <tr key={`m${i}c${j}`}>
                            {actualColumns.map(
                                (resultProperty, k) =>
                                    (resultProperty.level !== "molecule" ||
                                        j === 0) && (
                                        <TableCell
                                            key={k}
                                            result={result}
                                            resultProperty={resultProperty}
                                            rowSpan={
                                                resultProperty.level ===
                                                "molecule"
                                                    ? group.children.length
                                                    : 1
                                            }
                                            selectedAtom={
                                                module.task ===
                                                    "atom_property_prediction" &&
                                                selectedAtom !== undefined &&
                                                selectedAtom.molId ===
                                                    result.mol_id
                                                    ? selectedAtom.atomId
                                                    : undefined
                                            }
                                            onSelectAtom={
                                                module.task ===
                                                "atom_property_prediction"
                                                    ? handleAtomSelect
                                                    : null
                                            }
                                            highlighted={
                                                resultProperty.level ===
                                                    "atom" &&
                                                selectedAtom !== undefined &&
                                                selectedAtom.molId ===
                                                    result.mol_id &&
                                                selectedAtom.atomId ===
                                                    subKey(result)
                                            }
                                            onMouseEnter={(e) =>
                                                resultProperty.level === "atom"
                                                    ? handleAtomSelect(
                                                          e,
                                                          result.mol_id,
                                                          subKey(result),
                                                      )
                                                    : null
                                            }
                                            onMouseOut={(e) =>
                                                resultProperty.level === "atom"
                                                    ? handleAtomSelect(
                                                          e,
                                                          result.mol_id,
                                                          subKey(result),
                                                      )
                                                    : null
                                            }
                                        />
                                    ),
                            )}
                        </tr>
                    )),
                )}
            </tbody>
        </table>
    )
}

ResultTable.propTypes = {
    module: moduleType.isRequired,
    pageOneBased: PropTypes.number.isRequired,
    results: PropTypes.arrayOf(resultType).isRequired,
    columnSelection: PropTypes.array,
}
