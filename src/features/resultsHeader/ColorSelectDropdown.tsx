import type { ResultProperty } from "@/types"
import { Fragment } from "react/jsx-runtime"
import { AugmentedResultPropertyGroup } from "../resultTable/resultTableSlice"

type ColorSelectDropdownProps = {
    selectedAtomColorProperty?: ResultProperty
    possibleAtomColorProperties: ResultProperty[]
    onSelectedAtomColorPropertyChange: (property?: ResultProperty) => void
    resultPropertyGroups: AugmentedResultPropertyGroup[]
    onColorColumnToggle: (propertyName: string, colored: boolean) => void
    onColorGroupToggle: (groupName: string, colored: boolean) => void
}

export default function ColorSelectDropdown({
    selectedAtomColorProperty,
    possibleAtomColorProperties,
    onSelectedAtomColorPropertyChange,
    resultPropertyGroups,
    onColorColumnToggle,
    onColorGroupToggle,
}: ColorSelectDropdownProps) {
    const colorableGroups = resultPropertyGroups.filter(
        (group) => group.colorable,
    )

    return (
        <ul
            className="dropdown-menu dropdown-menu-end"
            style={{ zIndex: 1030 }}
        >
            {/* atom color selection */}
            {possibleAtomColorProperties.length > 0 && (
                <>
                    <li>
                        <h5 className="dropdown-header">Color atoms by</h5>
                    </li>
                    <li key="atom-color-none">
                        <a
                            className="dropdown-item"
                            href="#"
                            onClick={() =>
                                onSelectedAtomColorPropertyChange(undefined)
                            }
                        >
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    value=""
                                    id="atom-color-none"
                                    checked={
                                        selectedAtomColorProperty === undefined
                                    }
                                    onChange={() =>
                                        onSelectedAtomColorPropertyChange(
                                            undefined,
                                        )
                                    }
                                />
                                <label
                                    className="form-check-label fw-bold"
                                    htmlFor="atom-color-none"
                                >
                                    None
                                </label>
                            </div>
                        </a>
                    </li>
                    {possibleAtomColorProperties.map((property) => (
                        <li key={`atom-color-${property.name}`}>
                            <a
                                className="dropdown-item"
                                href="#"
                                onClick={() =>
                                    onSelectedAtomColorPropertyChange(property)
                                }
                            >
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        value=""
                                        id={`atom-color-${property.name}`}
                                        checked={
                                            property.name ===
                                            selectedAtomColorProperty?.name
                                        }
                                        onChange={() =>
                                            onSelectedAtomColorPropertyChange(
                                                property,
                                            )
                                        }
                                    />
                                    <label
                                        className="form-check-label fw-bold"
                                        htmlFor={`atom-color-${property.name}`}
                                    >
                                        {property.visibleName}
                                    </label>
                                </div>
                            </a>
                        </li>
                    ))}
                </>
            )}
            {/* Add a divider between categories */}
            {possibleAtomColorProperties.length > 0 && (
                <li>
                    <hr className="dropdown-divider" />
                </li>
            )}
            {/* Color columns */}
            <li>
                <h5 className="dropdown-header">Color columns</h5>
            </li>
            {colorableGroups.length == 0 && (
                <li>
                    <a className="dropdown-item disabled" aria-disabled="true">
                        No colorable columns selected
                    </a>
                </li>
            )}
            {colorableGroups.map((group, i) => (
                <Fragment key={group.groupName}>
                    <li>
                        <a
                            className="dropdown-item"
                            onClick={(e) => {
                                e.preventDefault()
                                onColorGroupToggle(
                                    group.groupName,
                                    !group.allColored,
                                )
                            }}
                        >
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id={group.groupName}
                                    checked={group.allColored}
                                    onChange={() =>
                                        onColorGroupToggle(
                                            group.groupName,
                                            !group.allColored,
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
                    {group.resultProperties.map(
                        (property) =>
                            property.colorable &&
                            property.visible && (
                                <li key={`${group.groupName}-${property.name}`}>
                                    <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            onColorColumnToggle(
                                                property.name,
                                                !property.colored,
                                            )
                                        }}
                                    >
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id={`${group.groupName}-${property.name}`}
                                                checked={property.colored}
                                                onChange={() =>
                                                    onColorColumnToggle(
                                                        property.name,
                                                        !property.colored,
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
                            ),
                    )}
                    {/* Add a divider between groups */}
                    {i < colorableGroups.length - 1 && (
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                    )}
                </Fragment>
            ))}
        </ul>
    )
}
