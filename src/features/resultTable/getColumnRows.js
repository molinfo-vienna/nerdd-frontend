export default function getColumnRows(resultProperties) {
    const hasGroups = resultProperties.some(
        (resultProperty) => !!resultProperty.group,
    )
    const rowSpan = hasGroups ? 2 : 1

    const firstColumnRow = []
    const secondColumnRow = []

    for (const resultProperty of resultProperties) {
        const { group } = resultProperty

        const lastColumn = firstColumnRow.slice(-1)[0]

        // check if the group is already in the list
        const partOfGroup =
            firstColumnRow.length > 0 && !!group && lastColumn.group === group

        if (group !== undefined) {
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
                group: undefined,
                name: resultProperty.name,
                colspan: 1,
                rowspan: rowSpan,
                ...resultProperty,
            })
        }
    }

    return { firstColumnRow, secondColumnRow }
}
