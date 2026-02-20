import BoolCell from "./BoolCell"
import DefaultCell from "./DefaultCell"
import FloatCell from "./FloatCell"
import ImageCell from "./ImageCell"
import IntCell from "./IntCell"
import MoleculeCell from "./MoleculeCell"
import ProblemListCell from "./ProblemListCell"
import RepresentationCell from "./RepresentationCell"
import SourceListCell from "./SourceListCell"
import StringCell from "./StringCell"
import TextCell from "./TextCell"
import type { CellRenderer } from "./types"

export const cellRenderers: Record<string, CellRenderer> = {
    mol: MoleculeCell,
    text: TextCell,
    float: FloatCell,
    int: IntCell,
    integer: IntCell,
    bool: BoolCell,
    boolean: BoolCell,
    image: ImageCell,
    problem_list: ProblemListCell,
    source_list: SourceListCell,
    representation: RepresentationCell,
    string: StringCell,
    str: StringCell,
}

export const defaultCellRenderer: CellRenderer = DefaultCell
