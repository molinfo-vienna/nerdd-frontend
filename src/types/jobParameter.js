import PropTypes from "prop-types"

const jobParameterChoiceType = PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
})

const jobParameterType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    visibleName: PropTypes.string.isRequired,
    helpText: PropTypes.string,
    default: PropTypes.any,
    required: PropTypes.bool,
    choices: PropTypes.arrayOf(jobParameterChoiceType),
})

export default jobParameterType
