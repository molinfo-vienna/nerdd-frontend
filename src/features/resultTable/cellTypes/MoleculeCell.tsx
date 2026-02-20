import { RxCross1 } from "react-icons/rx"
import Molecule from "@/features/resultTable/cellTypes/Molecule"
import ProblemListBadge from "@/features/resultTable/cellTypes/ProblemListBadge"
import type { CellRendererProps } from "./types"

export default function MoleculeCell({
    result,
    resultProperty,
    group,
    selectedAtom,
    onAtomSelect,
    propertyPalettes,
    value,
}: CellRendererProps) {
    if (resultProperty.name === "preprocessed_mol") {
        // The property preprocessed_mol is special, because
        // * we put the processing / loading errors at the top right of this cell
        // * the molecule image will always be on maximum size (not zoomable on hover)
        // * the atoms in this molecule depiction are selectable
        return (
            <div className="position-relative">
                {value == null && (
                    <RxCross1 className="error p-5 text-body-tertiary" />
                )}
                {value != null && (
                    <Molecule
                        svgValue={value}
                        group={group}
                        // color palette for atoms
                        propertyPalettes={propertyPalettes}
                        // atom selection
                        selectedAtom={selectedAtom}
                        onAtomSelect={onAtomSelect}
                    />
                )}
                <ProblemListBadge problems={result.problems} />
            </div>
        )
    }

    // If the current property is not preprocessed_mol, we opt for a molecule image that
    // * is zoomable on hover (zoomable wrapper div)
    // * shows a molecule on smaller size
    // * disables atom selection
    return (
        <div className="zoomable">
            {value == null && (
                <RxCross1 className="error p-5 text-body-tertiary" />
            )}
            {value != null && (
                <Molecule
                    svgValue={value}
                    group={group}
                    propertyPalettes={propertyPalettes}
                    // atom selection is disabled
                />
            )}
        </div>
    )
}
