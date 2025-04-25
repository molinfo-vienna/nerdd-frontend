import { HiMiniViewColumns } from "react-icons/hi2"
import ColumnSelectDropdown from "../columnSelect/ColumnSelectDropdown"
import ActionButton from "./ActionButton"

export default function ColumnSelectActionButton({
    columnSelection,
    onColumnSelectionChange,
}) {
    return (
        <ActionButton label="Columns">
            <ActionButton.Icon>
                <HiMiniViewColumns size={43} viewBox="0 0 20 15" />
            </ActionButton.Icon>
            <ActionButton.Dropdown>
                <ColumnSelectDropdown
                    columnSelection={columnSelection}
                    handleSelectionChange={onColumnSelectionChange}
                />
            </ActionButton.Dropdown>
        </ActionButton>
    )
}
