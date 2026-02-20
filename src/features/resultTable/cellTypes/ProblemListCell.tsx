import classNames from "classnames"
import ProblemIcon from "@/features/resultTable/cellTypes/ProblemIcon"
import "./ProblemIcon.css"
import type { CellRendererProps } from "./types"

export default function ProblemListCellRenderer({ value }: CellRendererProps) {
    if (value == null) {
        return "-"
    }

    return (
        <ul className="list-unstyled problem-list mb-0">
            {value.map(([problemType, message], i) => (
                <li
                    key={i}
                    className={classNames("d-flex", {
                        "mb-1": i < value.length - 1,
                    })}
                >
                    <ProblemIcon
                        // put space between the icon and the text
                        className="mx-2"
                        problemType={problemType}
                        size={15}
                    />
                    <span>{message}</span>
                </li>
            ))}
        </ul>
    )
}
