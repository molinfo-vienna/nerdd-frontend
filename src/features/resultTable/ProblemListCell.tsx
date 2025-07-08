import classNames from "classnames"
import ProblemIcon from "./ProblemIcon"
import "./ProblemIcon.css"

type ProblemListCellProps = {
    problems: [string, string][]
}

export default function ProblemListCell({ problems }: ProblemListCellProps) {
    return (
        <ul className="list-unstyled problem-list mb-0">
            {problems.map(([problemType, message], i) => (
                <li
                    key={i}
                    className={classNames("d-flex", {
                        "mb-1": i < problems.length - 1,
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
