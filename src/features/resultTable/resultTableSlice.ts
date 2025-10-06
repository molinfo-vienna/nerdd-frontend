import type { Level, PredictionTask, Result, ResultProperty } from "@/types"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { sortedIndexBy } from "lodash-es"

export type InternalResultProperty = ResultProperty & {
    // Indicates whether the property will be colored in the table
    colored: boolean
    // Indicates whether the property can potentially be colored
    colorable: boolean
}

export type AugmentedResultProperty = InternalResultProperty & {
    // Indicates whether the property starts / ends a property block (= continuous set of
    // properties with the same level)
    startBlock: boolean
    endBlock: boolean
}

export type ResultPropertyGroup = {
    groupName: string
    resultPropertyIds: number[]
}

export type AugmentedResultPropertyGroup = ResultPropertyGroup & {
    resultProperties: InternalResultProperty[]
    // Indicates whether all properties in the group are selected
    allSelected: boolean
    // Indicates whether all properties in the group are colored
    allColored: boolean
    // Indicates whether some propery in the group is colorable
    colorable: boolean
}

export type Column = {
    group: string
    name: string
    colspan: number
    rowspan: number
    visibleName?: string
    visible?: boolean
    sortable?: boolean
    level: Level
}

export type ResultGroup = {
    mol_id: number
    // the row indices to all entries in the molecule's group
    children: Result[]
}

export type ResultTableState = {
    task?: PredictionTask
    results: Result[]
    resultProperties: InternalResultProperty[]
    groups: ResultPropertyGroup[]
    atomColorPropertyId: number
    resultPropertyMapping: Record<string, number>
    sortBy?: string
    sortAscending: boolean
}

const initialState: ResultTableState = {
    task: undefined,
    results: [],
    resultProperties: [],
    groups: [],
    atomColorPropertyId: -1,
    resultPropertyMapping: {},
    sortBy: undefined,
    sortAscending: true,
}

const resultTableSlice = createSlice({
    name: "resultTable",
    initialState,
    reducers: {
        setResultProperties: (
            state,
            action: PayloadAction<ResultProperty[]>,
        ) => {
            const { payload: resultProperties } = action

            const transformedResultProperties: InternalResultProperty[] =
                resultProperties.map((resultProperty) => ({
                    ...resultProperty,
                    colorable: resultProperty.colorPalette != null,
                    // color all properties that have a color palette by default
                    colored: resultProperty.colorPalette != null,
                }))

            //
            // group result properties
            //
            const groups: ResultPropertyGroup[] = resultProperties.reduce(
                (acc: ResultPropertyGroup[], resultProperty, i) => {
                    const groupExists = acc.find(
                        (group) => group.groupName === resultProperty.group,
                    )
                    if (groupExists) {
                        groupExists.resultPropertyIds.push(i)
                    } else {
                        acc.push({
                            groupName: resultProperty.group,
                            resultPropertyIds: [i],
                        })
                    }
                    return acc
                },
                [],
            )

            //
            // atom color property
            //
            const atomColorPropertyId = resultProperties.findIndex(
                (resultProperty) =>
                    resultProperty.level === "atom" &&
                    resultProperty.colorPalette != null,
            )

            //
            // create a mapping from property name to index
            //
            const resultPropertyMapping = resultProperties.reduce(
                (mapping: Record<string, number>, resultProperty, index) => {
                    mapping[resultProperty.name] = index
                    return mapping
                },
                {},
            )

            return {
                ...state,
                resultProperties: transformedResultProperties,
                groups,
                atomColorPropertyId,
                resultPropertyMapping,
            }
        },
        setTask: (state, action: PayloadAction<PredictionTask>) => {
            state.task = action.payload
        },
        toggleSortingColumn: (
            state,
            action: PayloadAction<{
                sortBy: string
            }>,
        ) => {
            const idx = state.resultPropertyMapping[action.payload.sortBy]
            if (idx === undefined) {
                // property not found
                return
            }

            const property = state.resultProperties[idx]
            if (!property.sortable || property.level === "molecule") {
                // property is not sortable or has level "molecule"
                return
            }

            if (state.sortBy === action.payload.sortBy) {
                // toggle sorting order
                state.sortAscending = !state.sortAscending
            } else {
                state.sortBy = action.payload.sortBy
                state.sortAscending = true
            }
        },
        setResults: (state, action: PayloadAction<Result[]>) => {
            state.results = action.payload
        },
        setResultPropertyVisibility: (
            state,
            action: PayloadAction<{
                propertyName: string
                visible: boolean
            }>,
        ) => {
            const { propertyName, visible } = action.payload

            const propertyIndex = state.resultPropertyMapping[propertyName]
            if (propertyIndex !== undefined) {
                state.resultProperties[propertyIndex].visible = visible
            }

            // if the user hides all properties, make sure that at least one propery (structure)
            // is visible
            if (
                state.resultProperties.every(
                    (resultProperty) => !resultProperty.visible,
                )
            ) {
                const idx = state.resultPropertyMapping["preprocessed_mol"]
                state.resultProperties[idx].visible = true
            }
        },
        setGroupVisibility: (
            state,
            action: PayloadAction<{
                groupName: string
                visible: boolean
            }>,
        ) => {
            const { groupName, visible } = action.payload

            const group = state.groups.find((g) => g.groupName === groupName)
            if (group) {
                group.resultPropertyIds.forEach((columnId) => {
                    if (state.resultProperties[columnId]) {
                        state.resultProperties[columnId].visible = visible
                    }
                })
            }

            // if the user hides all properties, make sure that at least one propery (structure)
            // is visible
            if (
                state.resultProperties.every(
                    (resultProperty) => !resultProperty.visible,
                )
            ) {
                const idx = state.resultPropertyMapping["preprocessed_mol"]
                state.resultProperties[idx].visible = true
            }
        },
        setAtomColorProperty: (
            state,
            action: PayloadAction<ResultProperty | undefined>,
        ) => {
            if (action.payload !== undefined) {
                const propertyIndex =
                    state.resultPropertyMapping[action.payload.name]
                if (propertyIndex !== undefined) {
                    state.atomColorPropertyId = propertyIndex
                }
            } else {
                state.atomColorPropertyId = -1
            }
        },
        setResultPropertyIsColored: (
            state,
            action: PayloadAction<{
                propertyName: string
                colored: boolean
            }>,
        ) => {
            const { propertyName, colored } = action.payload

            const propertyIndex = state.resultPropertyMapping[propertyName]
            if (propertyIndex !== undefined) {
                state.resultProperties[propertyIndex].colored = colored
            }
        },
        setPropertyGroupIsColored: (
            state,
            action: PayloadAction<{
                groupName: string
                colored: boolean
            }>,
        ) => {
            const { groupName, colored } = action.payload

            const group = state.groups.find((g) => g.groupName === groupName)
            if (group) {
                group.resultPropertyIds.forEach((columnId) => {
                    if (state.resultProperties[columnId]) {
                        state.resultProperties[columnId].colored = colored
                    }
                })
            }
        },
    },
    selectors: {
        selectAugmentedResultPropertyGroups: createSelector(
            [
                (state: ResultTableState) => state.resultProperties,
                (state: ResultTableState) => state.groups,
            ],
            (resultProperties, groups): AugmentedResultPropertyGroup[] =>
                groups.map((group) => ({
                    ...group,
                    resultProperties: group.resultPropertyIds.map(
                        (columnId) => resultProperties[columnId],
                    ),
                    allSelected: group.resultPropertyIds.every(
                        (columnId) => resultProperties[columnId].visible,
                    ),
                    allColored: group.resultPropertyIds.every(
                        (columnId) =>
                            !resultProperties[columnId].visible ||
                            !resultProperties[columnId].colorable ||
                            resultProperties[columnId].colored,
                    ),
                    colorable: group.resultPropertyIds.some(
                        (columnId) =>
                            resultProperties[columnId].visible &&
                            resultProperties[columnId].colorable,
                    ),
                })),
        ),
        selectAtomColorProperty: createSelector(
            [
                (state: ResultTableState) => state.resultProperties,
                (state: ResultTableState) => state.atomColorPropertyId,
            ],
            (
                resultProperties,
                atomColorPropertyId,
            ): ResultProperty | undefined =>
                resultProperties[atomColorPropertyId],
        ),
        selectColumnRows: createSelector(
            [(state: ResultTableState) => state.resultProperties],
            (resultProperties: ResultProperty[]) => {
                const visibleResultProperties = resultProperties.filter(
                    (resultProperty) => resultProperty.visible,
                )

                const hasGroups = visibleResultProperties.some(
                    (resultProperty) => !!resultProperty.group,
                )
                const rowSpan = hasGroups ? 2 : 1

                const firstColumnRow: Column[] = []
                const secondColumnRow: Column[] = []

                for (const resultProperty of visibleResultProperties) {
                    const group = resultProperty.group

                    const lastColumn = firstColumnRow.slice(-1)[0]

                    // check if the group is already in the list
                    const partOfGroup =
                        firstColumnRow.length > 0 &&
                        !!group &&
                        lastColumn.group === group

                    if (group != "General") {
                        if (partOfGroup) {
                            lastColumn.colspan += 1
                        } else {
                            // group is specified, but group does not exist yet in columns
                            firstColumnRow.push({
                                group,
                                name: group,
                                colspan: 1,
                                rowspan: 1,
                                visibleName: group,
                                visible: true,
                                sortable: false,
                                level: "molecule",
                            })
                        }

                        // add the actual column to the second row
                        secondColumnRow.push({
                            rowspan: 1,
                            colspan: 1,
                            ...resultProperty,
                        })
                    } else {
                        // if no group is specified, take the column as it is
                        firstColumnRow.push({
                            rowspan: rowSpan,
                            colspan: 1,
                            ...resultProperty,
                        })
                    }
                }

                return { firstColumnRow, secondColumnRow }
            },
        ),
        selectVisibleResultProperties: createSelector(
            [(state: ResultTableState) => state.resultProperties],
            (resultProperties) => {
                const visibleResultProperties = resultProperties.filter(
                    (resultProperty) => resultProperty.visible,
                )

                return visibleResultProperties.map(
                    (resultProperty, i): AugmentedResultProperty => {
                        //
                        // figure out start and end of column blocks
                        //
                        const visiblePredecessor =
                            i > 0 ? visibleResultProperties[i - 1] : null
                        const visibleSuccessor =
                            i < visibleResultProperties.length - 1
                                ? visibleResultProperties[i + 1]
                                : null

                        const previousLevel =
                            visiblePredecessor !== null
                                ? visiblePredecessor.level
                                : "molecule"
                        const currentLevel = resultProperty.level ?? "molecule"
                        const nextLevel =
                            visibleSuccessor !== null
                                ? visibleSuccessor.level
                                : "molecule"

                        const startBlock =
                            previousLevel === "molecule" &&
                            ["atom", "derivative"].includes(currentLevel)

                        const endBlock =
                            ["atom", "derivative"].includes(currentLevel) &&
                            nextLevel === "molecule"

                        return {
                            ...resultProperty,
                            startBlock,
                            endBlock,
                        }
                    },
                )
            },
        ),
        selectPossibleAtomColorProperties: createSelector(
            [(state: ResultTableState) => state.resultProperties],
            (resultProperties): ResultProperty[] =>
                resultProperties.filter(
                    (resultProperty) =>
                        resultProperty.level === "atom" &&
                        resultProperty.colorPalette != null,
                ),
        ),
        selectResultsGroupedByMolId: createSelector(
            [
                (state: ResultTableState) => state.task,
                (state: ResultTableState) => state.results,
                (state: ResultTableState) => state.resultProperties,
                (state: ResultTableState) => state.resultPropertyMapping,
                (state: ResultTableState) => state.sortBy,
                (state: ResultTableState) => state.sortAscending,
            ],
            (
                task,
                results,
                resultProperties,
                resultPropertyMapping,
                sortBy,
                sortAscending,
            ) => {
                // sort results by molecule id (and the specified sortBy property)
                // -> construct a comparison function for sorting
                let sortByFinal = undefined
                if (task === "molecular_property_prediction") {
                    // there are no groups within a molecule and we set an arbitrary property name
                    sortByFinal = undefined
                } else {
                    if (sortBy != null) {
                        const propertyIndex = resultPropertyMapping[sortBy]
                        if (propertyIndex !== undefined) {
                            // make sure that the property is sortable and has level "atom" or
                            // "derivative"
                            const property = resultProperties[propertyIndex]

                            if (
                                property.sortable &&
                                ["atom", "derivative"].includes(property.level)
                            ) {
                                sortByFinal = sortBy
                            }
                        }
                    } else if (task === "atom_property_prediction") {
                        sortByFinal = "atom_id"
                    } else if (task === "derivative_property_prediction") {
                        sortByFinal = "derivative_id"
                    }
                }

                let comparator: (a: Result, b: Result) => number
                if (sortByFinal != null) {
                    const comparatorBase = (a: Result, b: Result) => {
                        if (a[sortByFinal!] == null && b[sortByFinal!] == null)
                            return 0
                        if (a[sortByFinal!] == null) return -1
                        if (b[sortByFinal!] == null) return 1

                        if (a[sortByFinal!] < b[sortByFinal!]) return -1
                        if (a[sortByFinal!] > b[sortByFinal!]) return 1
                        return 0
                    }
                    comparator = sortAscending
                        ? comparatorBase
                        : (a, b) => -comparatorBase(a, b)
                } else {
                    // no secondary sorting
                    comparator = () => 0
                }

                // entries might have multiple child rows (atoms, derivatives)
                // --> group results by molecule id
                const sortedResults = results.reduce(
                    (acc: ResultGroup[], result) => {
                        // find corresponding mol_id in acc
                        const groupIndex = sortedIndexBy(
                            acc,
                            result,
                            (x: ResultGroup) => x.mol_id,
                        )
                        const group = acc[groupIndex]

                        // check if mol_id is in acc
                        if (
                            group === undefined ||
                            group.mol_id !== result.mol_id
                        ) {
                            // if mol_id is not in acc, add it at the correct index
                            acc.splice(groupIndex, 0, {
                                mol_id: result.mol_id,
                                // the row indices to all entries in the molecule's group
                                children: [result],
                            })
                        } else {
                            // if mol_id is in acc, add the entry to the group
                            // add entry at the correct index (sorted by atom_id or derivative_id)
                            const subIndex = sortedIndexBy(
                                group.children,
                                result,
                                (a) => comparator(a, result),
                            )
                            group.children.splice(subIndex, 0, result)
                        }

                        return acc
                    },
                    [],
                )

                return sortedResults
            },
        ),
        selectNumberOfResults: createSelector(
            [(state: ResultTableState) => state.results],
            (results: Result[]) => results.length,
        ),
        selectSortingColumn: createSelector(
            [
                (state: ResultTableState) => state.sortBy,
                (state: ResultTableState) => state.sortAscending,
            ],
            (sortBy, sortAscending) => ({ sortBy, sortAscending }),
        ),
    },
})

export const {
    setResultProperties,
    setGroupVisibility,
    setResultPropertyVisibility,
    setAtomColorProperty,
    setResultPropertyIsColored,
    setPropertyGroupIsColored,
    setResults,
    setTask,
    toggleSortingColumn,
} = resultTableSlice.actions

export const {
    selectAugmentedResultPropertyGroups,
    selectAtomColorProperty,
    selectColumnRows,
    selectVisibleResultProperties,
    selectPossibleAtomColorProperties,
    selectResultsGroupedByMolId,
    selectNumberOfResults,
    selectSortingColumn,
} = resultTableSlice.selectors

export default resultTableSlice.reducer
