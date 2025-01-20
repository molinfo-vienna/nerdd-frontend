import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import ProblemIcon from "./ProblemIcon"

export default function ProblemListCell({ problems, className, ...props }) {
    return (
        <td className={classNames(className, "text-start")} {...props}>
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
        </td>
    )
}

ProblemListCell.propTypes = {
    problems: PropTypes.arrayOf(PropTypes.array).isRequired,
    className: PropTypes.string,
}
