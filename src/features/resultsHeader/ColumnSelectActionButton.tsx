import { HiMiniViewColumns } from "react-icons/hi2"
import { AugmentedResultPropertyGroup } from "../resultTable/resultTableSlice"
import ActionButton from "./ActionButton"
import ColumnSelectDropdown from "./ColumnSelectDropdown"

type ColumnSelectActionButtonProps = {
    resultPropertyGroups: AugmentedResultPropertyGroup[]
    onColumnToggle: (columnName: string, isSelected: boolean) => void
    onGroupToggle: (groupName: string, isSelected: boolean) => void
}

export default function ColumnSelectActionButton({
    resultPropertyGroups,
    onColumnToggle,
    onGroupToggle,
}: ColumnSelectActionButtonProps) {
    return (
        <ActionButton label="Columns">
            <ActionButton.Icon>
                <HiMiniViewColumns
                    viewBox="1 3 18 14"
                    style={{ width: "1.45em", height: "1em" }}
                />
            </ActionButton.Icon>
            <ActionButton.Dropdown>
                <ColumnSelectDropdown
                    resultPropertyGroups={resultPropertyGroups}
                    onColumnToggle={onColumnToggle}
                    onGroupToggle={onGroupToggle}
                />
            </ActionButton.Dropdown>
        </ActionButton>
    )
}
