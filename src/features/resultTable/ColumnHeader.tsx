import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6"
import { Column } from "./resultTableSlice"

type ColumnHeaderProps = {
    column: Column
    onClickSort(column: Column): void
    sortBy?: string
    sortAscending: boolean
}

export default function ColumnHeader({
    column,
    onClickSort,
    sortBy,
    sortAscending,
}: ColumnHeaderProps) {
    const sortable = column.sortable && column.level != "molecule"

    const sortIcon =
        column.name === sortBy ? (
            sortAscending ? (
                <FaSortUp />
            ) : (
                <FaSortDown />
            )
        ) : (
            <span className="text-body-tertiary">
                <FaSort />
            </span>
        )

    const content = sortable ? (
        <>
            {column.visibleName} {sortIcon}
        </>
    ) : (
        column.visibleName
    )

    return (
        <th
            scope="col"
            rowSpan={column.rowspan}
            colSpan={column.colspan}
            onClick={sortable ? () => onClickSort(column) : undefined}
        >
            {column.colspan > 1 ? (
                <div className="border-bottom border-primary mx-3 py-2">
                    {content}
                </div>
            ) : (
                content
            )}
        </th>
    )
}
