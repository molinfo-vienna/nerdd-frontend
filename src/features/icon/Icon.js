import PropTypes from "prop-types"
import React from "react"
import * as bsIcons from "react-icons/bs"
import * as oldFaIcons from "react-icons/fa"
import * as faIcons from "react-icons/fa6"
import * as hi2Icons from "react-icons/hi2"
import * as piIcons from "react-icons/pi"

const collectionMapping = {
    hi2: hi2Icons,
    oldFa: oldFaIcons,
    fa: faIcons,
    bs: bsIcons,
    pi: piIcons,
}

export default function Icon({ collection = "fa", name, ...props }) {
    const selectedCollection = collectionMapping[collection]

    const IconComponent = selectedCollection[name]

    if (!IconComponent) {
        console.error(`Icon ${name} not found`)
        return null
    }

    return <IconComponent {...props} />
}

Icon.propTypes = {
    collection: PropTypes.oneOf(Object.keys(collectionMapping)),
    name: PropTypes.string.isRequired,
}
