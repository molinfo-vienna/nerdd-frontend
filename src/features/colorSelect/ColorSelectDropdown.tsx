import type { ResultProperty } from '@/types';

type ColorSelectDropdownProps = {
    selectedAtomColorProperty?: ResultProperty;
    possibleAtomColorProperties?: ResultProperty[];
    onSelectedAtomColorPropertyChange: (property?: ResultProperty) => void;
}

export default function ColorSelectDropdown({
    selectedAtomColorProperty,
    possibleAtomColorProperties,
    onSelectedAtomColorPropertyChange,
}: ColorSelectDropdownProps) {
    return (
        <ul
            className="dropdown-menu dropdown-menu-end"
            style={{ zIndex: 1030 }}
        >
            {possibleAtomColorProperties?.length > 0 && (
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
        </ul>
    )
}
