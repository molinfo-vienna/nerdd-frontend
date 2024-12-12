import _ from "lodash"
import ReactDOMServer from "react-dom/server"
import Icon from "../features/icon/Icon"

function normalizeJobParameter(jobParameter) {
    return {
        ...jobParameter,
        visibleName:
            jobParameter.visibleName ||
            _.upperFirst(_.camelCase(jobParameter.name)),
    }
}

function normalizeResultProperty(resultProperty) {
    return {
        ...resultProperty,
        visibleName:
            resultProperty.visibleName ||
            _.upperFirst(_.camelCase(resultProperty.name)),
    }
}

export function normalizeModule(module) {
    const reactElement = Icon({
        collection: "pi",
        name: "PiGearLight",
        stroke: "#084887",
        fill: "#084887",
    })

    const logo =
        module.logo ||
        "data:image/svg+xml," +
            escape(ReactDOMServer.renderToStaticMarkup(reactElement))

    const jobParameters = module.jobParameters?.map(normalizeJobParameter)

    const resultProperties = module.resultProperties?.map(
        normalizeResultProperty,
    )

    return {
        ...module,
        visibleName:
            module.visibleName || _.upperFirst(_.camelCase(module.name)),
        logo,
        jobParameters,
        resultProperties,
    }
}
