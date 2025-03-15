import classNames from "classnames"
import PropTypes from "prop-types"
import React, { useCallback, useState } from "react"
import { moduleType, resultPropertyType } from "../../types"
import TableCell from "./TableCell"

export default function TableRowGroup({
    group,
    module,
    atomColorProperty,
    resultProperties,
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
                            group={group}
                            selectedAtom={selectedAtom}
                            onAtomSelect={
                                module.task === "atom_property_prediction"
                                    ? handleAtomSelect
                                    : null
                            }
                            atomColorProperty={atomColorProperty}
                        />
                    ),
            )}
        </tr>
    ))
}

TableRowGroup.propTypes = {
    group: PropTypes.object.isRequired,
    module: moduleType.isRequired,
    resultProperties: PropTypes.arrayOf(resultPropertyType).isRequired,
    atomColorProperty: resultPropertyType,
}
