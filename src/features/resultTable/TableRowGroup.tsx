import type { Module } from "@/types"
import classNames from "classnames"
import { useCallback, useState } from "react"
import TableCell from "./TableCell"
import type { AugmentedResultProperty, ResultGroup } from "./resultTableSlice"

type TableRowGroupProps = {
    group: ResultGroup
    module: Module
    resultProperties: AugmentedResultProperty[]
}

export default function TableRowGroup({
    group,
    module,
    resultProperties,
}: TableRowGroupProps) {
    //
    // handle mouse over event
    //
    const [selectedAtom, setSelectedAtom] = useState<number | undefined>(
        undefined,
    )

    const handleAtomSelect = useCallback(
        (atomId?: number) => {
            setSelectedAtom(atomId)
        },
        [setSelectedAtom],
    )

    return group.children.map((result, j) => (
        <tr key={result.id}>
            {resultProperties.map(
                (resultProperty) =>
                    // Render the molecule properties only for the first row of the group.
                    (resultProperty.level !== "molecule" || j === 0) && (
                        <TableCell
                            key={resultProperty.name}
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
                                    : undefined
                            }
                        />
                    ),
            )}
        </tr>
    ))
}
