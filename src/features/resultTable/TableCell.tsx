import { useColorPalettesContext } from "@/features/colorPalettes/hooks"
import type { Module, Result } from "@/types"
import classNames from "classnames"
import { rgb } from "d3-color"
import { cellRenderers, defaultCellRenderer } from "./cellTypes"
import { ResultGroup, type AugmentedResultProperty } from "./resultTableSlice"

type TableCellProps = {
    module: Module
    result: Result
    resultProperty: AugmentedResultProperty
    group: ResultGroup
    selectedAtom?: number
    className?: string
    onAtomSelect?: (atomId?: number) => void
}

export default function TableCell({
    module,
    result,
    resultProperty,
    group,
    selectedAtom,
    className,
    onAtomSelect,
}: TableCellProps) {
    const { getColor } = useColorPalettesContext()
    const value = result[resultProperty.name]

    // compressed: cell is smaller when it refers to an atom / derivative entry
    const compressed =
        resultProperty.level !== undefined &&
        resultProperty.level !== "molecule"

    //
    // figure out content to render
    //
    const rendererProps = {
        module,
        result,
        resultProperty,
        group,
        selectedAtom,
        className,
        onAtomSelect,
        value,
        compressed,
    }
    const cellRenderer =
        cellRenderers[resultProperty.type] ?? defaultCellRenderer
    const cellContent = cellRenderer(rendererProps)

    //
    // figure out background color (and contrast text color)
    //
    const backgroundColor = resultProperty.colored
        ? getColor(resultProperty.name, value)
        : undefined
    let needsLightText = false
    if (backgroundColor !== undefined) {
        const { r, g, b } = rgb(backgroundColor)
        const luminance =
            (0.2126 * r) / 255 + (0.7152 * g) / 255 + (0.0722 * b) / 255
        needsLightText = luminance < 0.5
    }

    //
    // render actual table cell
    //
    const commonProps = {
        rowSpan: compressed ? 1 : group.children.length,
        className: classNames(className, {
            compressed,
            highlighted:
                resultProperty.level === "atom" &&
                selectedAtom === result.atom_id,
            "start-block": resultProperty.startBlock,
            "end-block": resultProperty.endBlock,
            "text-start": resultProperty.type === "problem_list",
            // By default, all cells are aligned vertically at the center. If the module task is
            // atom or derivative property prediction, we would like to align the molecule-level
            // cells at the top.
            "align-top":
                module.task !== "molecular_property_prediction" &&
                resultProperty.level === "molecule",
            "d-none": !resultProperty.visible,
            "text-light": needsLightText,
        }),
        style: {
            backgroundColor,
        },
        onMouseEnter: () =>
            resultProperty.level === "atom" && onAtomSelect
                ? onAtomSelect(result.atom_id)
                : null,
        onMouseOut: () =>
            resultProperty.level === "atom" && onAtomSelect
                ? onAtomSelect(undefined)
                : null,
    }

    return <td {...commonProps}>{cellContent}</td>
}
