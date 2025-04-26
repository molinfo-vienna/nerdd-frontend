import type { Module, ResultProperty } from "@/types"
import classNames from "classnames"
import { useCallback, useState } from "react"
import TableCell from "./TableCell"
import { AugmentedResultProperty } from "./resultTableSlice"

type Group = {
    children: any[]
}

type TableRowGroupProps = {
    group: Group
    module: Module
    atomColorProperty?: ResultProperty
    resultProperties: AugmentedResultProperty[]
    propertyPalettes: Record<string, any>
}

export default function TableRowGroup({
    group,
    module,
    atomColorProperty,
    resultProperties,
    propertyPalettes,
}: TableRowGroupProps) {
    //
    // handle mouse over event
    //
    const [selectedAtom, setSelectedAtom] = useState<number | undefined>(
        undefined,
    )

    const handleAtomSelect = useCallback(
        (atomId: number) => {
            setSelectedAtom(atomId)
        },
        [setSelectedAtom],
    )

    return group.children.map((result, j) => (
        <tr key={j}>
            {resultProperties.map(
                // TODO: use name instead of k
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
                            propertyPalettes={propertyPalettes}
                        />
                    ),
            )}
        </tr>
    ))
}
