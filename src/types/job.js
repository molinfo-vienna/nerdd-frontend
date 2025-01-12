import PropTypes from "prop-types"

const jobType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    jobType: PropTypes.string.isRequired,
    sourceId: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    status: PropTypes.string.isRequired,
    entriesProcessed: PropTypes.array,
    numEntriesTotal: PropTypes.number,
    numEntriesProcessed: PropTypes.number.isRequired,
    numPagesTotal: PropTypes.number,
    numPagesProcessed: PropTypes.number.isRequired,
    pageSize: PropTypes.number,
    outputFiles: PropTypes.arrayOf(
        PropTypes.shape({
            format: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ),
    jobUrl: PropTypes.string.isRequired,
    resultsUrl: PropTypes.string.isRequired,
})

export default jobType
