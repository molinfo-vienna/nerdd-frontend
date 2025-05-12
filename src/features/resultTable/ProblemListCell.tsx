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
                    className={classNames("d-flex align-items-center", {
                        "mb-1": i < problems.length - 1,
                    })}
                >
                    <ProblemIcon
                        className="mx-2"
                        problemType={problemType}
                        size={15}
                    />
                    <p>{message}</p>
                </li>
            ))}
        </ul>
    )
}
