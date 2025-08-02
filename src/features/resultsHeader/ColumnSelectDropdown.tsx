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
                            onClick={() =>
                                onGroupToggle(
                                    group.groupName,
                                    !group.allSelected,
                                )
                            }
                        >
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id={group.groupName}
                                    checked={group.allSelected}
                                    // When clicking the checkbox, the event bubbles up to the <a>
                                    // and triggers onGroupToggle. For this reason, we don't need
                                    // an onChange / onClick handler here.
                                    readOnly
                                />
                                <label
                                    className="form-check-label fw-bolder"
                                    // Don't use htmlFor here: clicking the label would trigger the
                                    // checkbox twice.
                                    // htmlFor={group.groupName}
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
                                onClick={() =>
                                    onColumnToggle(
                                        property.name,
                                        !property.visible,
                                    )
                                }
                            >
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id={`${group.groupName}-${property.name}`}
                                        checked={property.visible}
                                        // When clicking the checkbox, the event bubbles up to the
                                        // <a> and triggers onColumnToggle. For this reason, we
                                        // don't need an onChange / onClick handler here.
                                        readOnly
                                    />
                                    <label
                                        className="form-check-label d-block"
                                        // Don't use htmlFor here: clicking the label would trigger
                                        // the onChange event on the checkbox, but doesn't bubble up
                                        // to the <a> element above. Nothing would happen.
                                        // htmlFor={`${group.groupName}-${property.name}`}
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
