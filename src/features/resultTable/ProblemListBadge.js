import PropTypes from "prop-types"
import React from "react"
import ProblemIconWithTooltip from "./ProblemIconWithTooltip"

export default function ProblemListBadge({ problems, ...props }) {
    return (
        <div className="position-absolute top-0 end-0" {...props}>
            <div className="mt-1 me-1">
                {problems.map(([problemType, message], i) => (
                    <ProblemIconWithTooltip
                        key={i}
                        problemType={problemType}
                        size={15}
                        tooltip={message}
                    />
                ))}
            </div>
        </div>
    )
}

ProblemListBadge.propTypes = {
    problems: PropTypes.arrayOf(PropTypes.array).isRequired,
}
