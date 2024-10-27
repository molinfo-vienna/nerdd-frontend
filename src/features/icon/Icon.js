import PropTypes from "prop-types"
import React from "react"
import * as bsIcons from "react-icons/bs"
import * as faIcons from "react-icons/fa6"
import * as piIcons from "react-icons/pi"

const collectionMapping = {
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
