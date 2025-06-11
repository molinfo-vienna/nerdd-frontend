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
                <HiMiniViewColumns
                    viewBox="1 3 18 14"
                    style={{ width: "1.45em", height: "1em" }}
                />
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
