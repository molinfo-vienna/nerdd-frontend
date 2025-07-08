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
        <Tooltip text={tooltip} className="d-inline-flex">
            <ProblemIcon problemType={problemType} size={size} />
        </Tooltip>
    )
}
