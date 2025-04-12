import classNames from "classnames"
import PropTypes from "prop-types"
import React, { useCallback, useState } from "react"
import { moduleType } from "../../types"
import TableCell from "./TableCell"

export default function TableRowGroup({
    group,
    resultProperties,
    module,
    colorPalettes,
}) {
    //
    // handle mouse over event
    //
    const [selectedAtom, setSelectedAtom] = useState(undefined)

    const handleAtomSelect = useCallback(
        (atomId) => {
            setSelectedAtom(atomId)
        },
        [setSelectedAtom],
    )

    return group.children.map((result, j) => (
        <tr key={j}>
            {resultProperties.map(
                (resultProperty, k) =>
                    // Render the molecule properties only for the first row of the group.
                    (resultProperty.level !== "molecule" || j === 0) && (
                        <TableCell
                            key={k}
                            className={classNames({
                                "row-group-end":
                                    resultProperty.level === "molecule" ||
                                    j == group.children.length - 1,
                            })}
                            module={module}
                            result={result}
                            resultProperty={resultProperty}
                            rowSpan={
                                resultProperty.level === "molecule"
                                    ? group.children.length
                                    : 1
                            }
                            selectedAtom={selectedAtom}
                            onAtomSelect={
                                module.task === "atom_property_prediction"
                                    ? handleAtomSelect
                                    : null
                            }
                            colorPalette={colorPalettes[resultProperty.name]}
                        />
                    ),
            )}
        </tr>
    ))
}

TableRowGroup.propTypes = {
    group: PropTypes.object.isRequired,
    resultProperties: PropTypes.array.isRequired,
    module: moduleType.isRequired,
    colorPalettes: PropTypes.object.isRequired,
}
