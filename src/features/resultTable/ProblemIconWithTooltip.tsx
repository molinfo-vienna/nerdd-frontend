import Tooltip from "../tooltip/Tooltip"
import ProblemIcon from "./ProblemIcon"

type ProblemIconWithTooltipProps = {
    problemType: string
    tooltip: string
    size?: number
}

export default function ProblemIconWithTooltip({
    problemType,
    tooltip,
    size,
}: ProblemIconWithTooltipProps) {
    return (
        <Tooltip
            text={tooltip}
            className={`problem-icon bg-danger rounded-circle ms-1 text-white
                        d-inline-flex align-items-center justify-content-center`}
        >
            <ProblemIcon problemType={problemType} size={size} />
        </Tooltip>
    )
}
