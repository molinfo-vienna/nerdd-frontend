import { FaQuestion } from "react-icons/fa"
import {
    FaArrowRotateRight,
    FaAtom,
    FaWeightHanging,
    FaXmark,
} from "react-icons/fa6"
import { MdBrokenImage } from "react-icons/md"
import { SiMoleculer } from "react-icons/si"

const iconMapping = {
    remove_stereochemistry_failed: FaArrowRotateRight,
    incomplete_prediction_error: MdBrokenImage,
    unknown_preprocessing_error: FaQuestion,
    invalid_elements: FaAtom,
    invalid_weight: FaWeightHanging,
    unknown: FaQuestion,
    invalid_smiles: MdBrokenImage,
    unknown_prediction_error: FaQuestion,
    kekulization_error: SiMoleculer,
}

const defaultIcon = FaXmark

type ProblemIconProps = {
    problemType: string
    tooltip?: string
    size?: number
    className?: string
}

export default function ProblemIcon({
    problemType,
    size,
    className,
}: ProblemIconProps) {
    const Icon = iconMapping[problemType] ?? defaultIcon
    return <Icon size={size} className={className} />
}
