import PropTypes from "prop-types"
import React from "react"

export default function ColumnSelectDropdown({
    columnSelection,
    handleSelectionChange,
}) {
    return (
        <div
            className="dropdown-menu dropdown-menu-end p-3"
            style={{ zIndex: 1030 }}
        >
            {columnSelection.map((group) => (
                <div className="pb-3" key={group.groupName}>
                    <div className="form-check dropdown-item">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id={group.groupName}
                        />
                        <label
                            className="form-check-label fw-bold"
                            htmlFor={group.groupName}
                        >
                            {group.groupName}
                        </label>
                    </div>
                    {group.columns.map((column) => (
                        <div
                            key={column.name}
                            className="form-check dropdown-item"
                        >
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id={column.name}
                                checked={column.visible}
                                onChange={(e) =>
                                    handleSelectionChange(
                                        group.groupName,
                                        column.name,
                                        e.target.checked,
                                    )
                                }
                            />
                            <label
                                className="form-check-label d-block"
                                htmlFor={column.name}
                            >
                                {column.label}
                            </label>
                        </div>
                    ))}
                </div>
            ))}
        </div>
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
    ).isRequired,
    handleSelectionChange: PropTypes.func.isRequired,
}
