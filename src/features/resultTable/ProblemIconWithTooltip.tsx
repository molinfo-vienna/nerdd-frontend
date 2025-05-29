import PopUp from "@/features/popup/PopUp"
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
        <PopUp text={tooltip} className="d-inline-flex">
            <ProblemIcon problemType={problemType} size={size} />
        </PopUp>
    )
}
