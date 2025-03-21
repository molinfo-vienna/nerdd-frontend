import classNames from "classnames"
import ProblemIcon from "./ProblemIcon"

type ProblemListCellProps = {
    problems: [string, string][]
    className?: string
}

export default function ProblemListCell({
    problems,
    className,
}: ProblemListCellProps) {
    return (
        <ul className="list-unstyled problem-list mb-0">
            {problems.map(([problemType, message], i) => (
                <li
                    key={i}
                    className={classNames("d-flex align-items-center", {
                        "mb-1": i < problems.length - 1,
                    })}
                >
                    <div className="problem-icon mx-2">
                        <ProblemIcon
                            problemType={problemType}
                            size={15}
                            className="text-white"
                        />
                    </div>
                    {message}
                </li>
            ))}
        </ul>
    )
}
