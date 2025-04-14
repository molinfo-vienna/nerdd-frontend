import PropTypes from "prop-types"
import React, { Fragment } from "react"

export default function ColumnSelectDropdown({
    columnSelection,
    handleSelectionChange,
}) {
    if (columnSelection === undefined) {
        return
    }

    // compute for each column group if all columns in that group are selected
    const allSelectedInGroup = columnSelection.map((group) =>
        group.columns.map((c) => c.visible).every(Boolean),
    )

    return (
        <ul className="dropdown-menu" style={{ zIndex: 1030 }}>
            {columnSelection.map((group, i) => (
                <Fragment key={group.groupName}>
                    <li>
                        <a
                            className="dropdown-item"
                            onClick={(e) => {
                                e.preventDefault()
                                handleSelectionChange(
                                    group.groupName,
                                    null,
                                    !allSelectedInGroup[i],
                                )
                            }}
                        >
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id={group.groupName}
                                    checked={allSelectedInGroup[i]}
                                    onChange={() =>
                                        handleSelectionChange(
                                            group.groupName,
                                            null,
                                            !allSelectedInGroup[i],
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
                    {group.columns.map((column) => (
                        <li key={`${group.groupName}-${column.name}`}>
                            <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleSelectionChange(
                                        group.groupName,
                                        column.name,
                                        !column.visible,
                                    )
                                }}
                            >
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id={`${group.groupName}-${column.name}`}
                                        checked={column.visible}
                                        onChange={() =>
                                            handleSelectionChange(
                                                group.groupName,
                                                column.name,
                                                !column.visible,
                                            )
                                        }
                                    />
                                    <label
                                        className="form-check-label d-block"
                                        htmlFor={`${group.groupName}-${column.name}`}
                                    >
                                        {column.label}
                                    </label>
                                </div>
                            </a>
                        </li>
                    ))}
                    {/* Add a divider between groups */}
                    {i < columnSelection.length - 1 && (
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                    )}
                </Fragment>
            ))}
        </ul>
    )
}

ColumnSelectDropdown.propTypes = {
    columnSelection: PropTypes.arrayOf(
        PropTypes.shape({
            groupName: PropTypes.string.isRequired,
            columns: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired,
                    visible: PropTypes.bool.isRequired,
                }),
            ).isRequired,
        }),
    ),
    handleSelectionChange: PropTypes.func.isRequired,
}
