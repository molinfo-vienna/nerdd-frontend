import React, { useCallback, useState } from "react"
import TableCell from "./TableCell"

export default function TableRowGroup({ group, resultProperties, module }) {
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
                        />
                    ),
            )}
        </tr>
    ))
}
