import PropTypes from "prop-types"
import React from "react"
import { BsLayoutThreeColumns } from "react-icons/bs"
import ColumnSelectDropdown from "./ColumnSelectDropdown"

export default function ColumnSelect({
    columnSelection,
    onSelectionChange,
    ...props
}) {
    const handleSelectionChange = (group, column, visible) => {
        const newColumnSelection = columnSelection.map((g) => {
            if (g.groupName === group) {
                return {
                    ...g,
                    columns: g.columns.map((c) => {
                        if (c.name === column || column === null) {
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

    if (columnSelection === undefined) {
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
                >
                    <BsLayoutThreeColumns /> Columns
                </button>
                <ColumnSelectDropdown
                    columnSelection={columnSelection}
                    handleSelectionChange={handleSelectionChange}
                />
            </div>
        </div>
    )
}

ColumnSelect.propTypes = {
    columnSelection: PropTypes.array,
    onSelectionChange: PropTypes.func,
}
