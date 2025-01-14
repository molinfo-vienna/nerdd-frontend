import PropTypes from "prop-types"
import jobParameterType from "./jobParameter"
import resultPropertyType from "./resultProperty"
import publicationType from "./publication"

const moduleType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    visibleName: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    logoCaption: PropTypes.string,
    description: PropTypes.string,
    task: PropTypes.string,

    publications: PropTypes.arrayOf(publicationType),

    jobParameters: PropTypes.arrayOf(jobParameterType),
    resultProperties: PropTypes.arrayOf(resultPropertyType),
})

export default moduleType
