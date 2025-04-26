import { type ResultProperty } from "@/types"
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"

export type AugmentedResultProperty = ResultProperty & {
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
    resultProperties: ResultProperty[]
    // Indicates whether all properties in the group are selected
    allSelected: boolean
}

export type Column = {
    group?: string
    name: string
    colspan: number
    rowspan: number
    visibleName?: string
    visible?: boolean
    sortable?: boolean
}

export type ResultTableState = {
    resultProperties: ResultProperty[]
    groups: ResultPropertyGroup[]
    atomColorPropertyId: number
    resultPropertyMapping: Record<string, number>
}

const initialState: ResultTableState = {
    resultProperties: [],
    groups: [],
    atomColorPropertyId: -1,
    resultPropertyMapping: {},
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
                resultProperties,
                groups,
                atomColorPropertyId,
                resultPropertyMapping,
            }
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
            (resultProperties: ResultProperty[]) => {
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
    },
})

export const {
    setResultProperties,
    setGroupVisibility,
    setResultPropertyVisibility,
    setAtomColorProperty,
} = resultTableSlice.actions

export const {
    selectAugmentedResultPropertyGroups,
    selectAtomColorProperty,
    selectColumnRows,
    selectVisibleResultProperties,
    selectPossibleAtomColorProperties,
} = resultTableSlice.selectors

export default resultTableSlice.reducer
