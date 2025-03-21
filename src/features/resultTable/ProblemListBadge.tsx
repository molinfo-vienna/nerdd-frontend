import ProblemIconWithTooltip from "./ProblemIconWithTooltip"

type ProblemListBadgeProps = {
    problems: Array<[string, string]>
    [key: string]: any
}

export default function ProblemListBadge({
    problems,
    ...props
}: ProblemListBadgeProps) {
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
