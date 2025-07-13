import PopUp from "@/features/popup/PopUp"
import ProblemIcon from "./ProblemIcon"

type ProblemListBadgeProps = {
    problems: Array<[string, string]>
}

export default function ProblemListBadge({ problems }: ProblemListBadgeProps) {
    return (
        <div className="position-absolute top-0 end-0">
            <div className="mt-1 me-1">
                {problems.map(([problemType, message], i) => (
                    <PopUp key={i} text={message} className="d-inline-flex">
                        <ProblemIcon problemType={problemType} size={14} />
                    </PopUp>
                ))}
            </div>
        </div>
    )
}
