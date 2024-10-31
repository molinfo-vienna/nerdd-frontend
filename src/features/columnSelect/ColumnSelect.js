import React, { useState } from "react"
import Icon from "../icon/Icon"

export default function ColumnSelect({
    columnSelection,
    onSelectionChange,
    ...props
}) {
    const [dropdown, setDropdown] = useState(null)

    const handleClick = () => {
        if (!dropdown) {
            return
        }
        dropdown.toggle()
    }

    const handleSelectionChange = (group, column, visible) => {
        const newColumnSelection = columnSelection.map((g) => {
            if (g.groupName === group) {
                return {
                    ...g,
                    columns: g.columns.map((c) => {
                        if (c.name === column) {
                            return { ...c, visible }
                        }
                        return c
                    }),
                }
            }
            return g
        })

        onSelectionChange(newColumnSelection)
    }

    if (!columnSelection) {
        return null
    }

    return (
        <div {...props}>
            <div className="dropdown">
                <button
                    className="btn btn-outline-dark dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                    onClick={handleClick}
                >
                    <Icon collection="bs" name="BsLayoutThreeColumns" /> Columns
                </button>
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
            </div>
        </div>
    )
}
