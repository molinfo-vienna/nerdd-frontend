import { Fragment } from "react"
import { AugmentedResultPropertyGroup } from "../resultTable/resultTableSlice"

type ColumnSelectDropdownProps = {
    resultPropertyGroups: AugmentedResultPropertyGroup[]
    onColumnToggle: (columnName: string, isSelected: boolean) => void
    onGroupToggle: (groupName: string, isSelected: boolean) => void
}

export default function ColumnSelectDropdown({
    resultPropertyGroups,
    onColumnToggle,
    onGroupToggle,
}: ColumnSelectDropdownProps) {
    return (
        <ul className="dropdown-menu" style={{ zIndex: 1030 }}>
            {resultPropertyGroups.map((group, i) => (
                <Fragment key={group.groupName}>
                    <li>
                        <a
                            className="dropdown-item"
                            onClick={(e) => {
                                e.preventDefault()
                                onGroupToggle(
                                    group.groupName,
                                    !group.allSelected,
                                )
                            }}
                        >
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id={group.groupName}
                                    checked={group.allSelected}
                                    onChange={() =>
                                        onGroupToggle(
                                            group.groupName,
                                            !group.allSelected,
                                        )
                                    }
                                />
                                <label
                                    className="form-check-label fw-bolder"
                                    htmlFor={group.groupName}
                                >
                                    {group.groupName}
                                </label>
                            </div>
                        </a>
                    </li>
                    {group.resultProperties.map((property) => (
                        <li key={`${group.groupName}-${property.name}`}>
                            <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    onColumnToggle(
                                        property.name,
                                        !property.visible,
                                    )
                                }}
                            >
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id={`${group.groupName}-${property.name}`}
                                        checked={property.visible}
                                        onChange={() =>
                                            onColumnToggle(
                                                property.name,
                                                !property.visible,
                                            )
                                        }
                                    />
                                    <label
                                        className="form-check-label d-block"
                                        htmlFor={`${group.groupName}-${property.name}`}
                                    >
                                        {property.visibleName}
                                    </label>
                                </div>
                            </a>
                        </li>
                    ))}
                    {/* Add a divider between groups */}
                    {i < resultPropertyGroups.length - 1 && (
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                    )}
                </Fragment>
            ))}
        </ul>
    )
}
