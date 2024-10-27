import PropTypes from "prop-types"
import jobParameterType from "./jobParameter"
import resultPropertyType from "./resultProperty"

const moduleType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    visibleName: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    logoCaption: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,

    jobParameters: PropTypes.arrayOf(jobParameterType),
    resultProperties: PropTypes.arrayOf(resultPropertyType),
})

export default moduleType
