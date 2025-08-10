import { memo } from "react"
import { HiMiniViewColumns } from "react-icons/hi2"
import { AugmentedResultPropertyGroup } from "../resultTable/resultTableSlice"
import ActionButton from "./ActionButton"
import ColumnSelectDropdown from "./ColumnSelectDropdown"

type ColumnSelectActionButtonProps = {
    resultPropertyGroups: AugmentedResultPropertyGroup[]
    onColumnToggle: (columnName: string, isSelected: boolean) => void
    onGroupToggle: (groupName: string, isSelected: boolean) => void
}

function ColumnSelectActionButton({
    resultPropertyGroups,
    onColumnToggle,
    onGroupToggle,
}: ColumnSelectActionButtonProps) {
    return (
        <div className="btn-group dropdown-center" role="group">
            <ActionButton
                label="Columns"
                // dropdown
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
            >
                <ActionButton.Icon>
                    <HiMiniViewColumns
                        viewBox="1 3 18 14"
                        style={{ width: "1.45em", height: "1em" }}
                    />
                </ActionButton.Icon>
            </ActionButton>
            <ColumnSelectDropdown
                resultPropertyGroups={resultPropertyGroups}
                onColumnToggle={onColumnToggle}
                onGroupToggle={onGroupToggle}
            />
        </div>
    )
}

export default memo(ColumnSelectActionButton)
