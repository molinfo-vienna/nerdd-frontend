import ProblemIconWithTooltip from "./ProblemIconWithTooltip"

type ProblemListBadgeProps = {
    problems: Array<[string, string]>
}

export default function ProblemListBadge({ problems }: ProblemListBadgeProps) {
    return (
        <div className="position-absolute top-0 end-0">
            <div className="mt-1 me-1">
                {problems.map(([problemType, message], i) => (
                    <ProblemIconWithTooltip
                        key={i}
                        problemType={problemType}
                        size={14}
                        tooltip={message}
                    />
                ))}
            </div>
        </div>
    )
}
